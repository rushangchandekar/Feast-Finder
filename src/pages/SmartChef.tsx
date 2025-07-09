"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { useToast } from "../hooks/use-toast";
import useLocalStorage from "../hooks/useLocalStorage";
import type { Recipe } from "../lib/types";
import {
  ChefHat, Sparkles, Loader2, Utensils,
  Carrot, ClipboardList, ThumbsUp, ThumbsDown,
  Bookmark, AlertCircle,
} from "lucide-react";
import {
  Form, FormControl, FormField, FormItem,
  FormLabel, FormMessage,
} from "../components/ui/form";

const ingredientFormSchema = z.object({
  ingredients: z.string().min(3, {
    message: "Please enter at least one ingredient (min. 3 characters).",
  }),
});

type IngredientFormValues = z.infer<typeof ingredientFormSchema>;

export default function FridgeFeastPage() {
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>("fridge-feast-recipes", []);

  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: { ingredients: "" },
  });

  const handleGenerateRecipe: SubmitHandler<IngredientFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setGeneratedRecipe(null);
    try {
      const res = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: data.ingredients }),
      });
      if (!res.ok) throw new Error("Failed to generate recipe.");
      const recipeOutput = await res.json();
      if (recipeOutput && recipeOutput.title) {
        setGeneratedRecipe(recipeOutput);
      } else {
        throw new Error("Invalid response format.");
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Recipe generation failed: ${errorMessage}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (feedbackType: 'like' | 'dislike') => {
    if (!generatedRecipe) return;

    const recipeString = `Title: ${generatedRecipe.title}
Ingredients: ${generatedRecipe.ingredients.join(', ')}
Instructions: ${generatedRecipe.instructions.join('; ')}`;

    try {
      const res = await fetch("/api/improve-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipe: recipeString,
          feedback: feedbackType,
        }),
      });
      if (!res.ok) throw new Error("Feedback API failed.");
      toast({
        title: "Feedback Sent",
        description: `Thank you for your ${feedbackType}! This helps improve future suggestions.`,
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      toast({
        variant: "destructive",
        title: "Feedback Error",
        description: `Could not send feedback: ${errorMessage}`,
      });
    }
  };

  const handleSaveRecipe = () => {
    if (!generatedRecipe) return;
    const alreadySaved = savedRecipes.some(
      (recipe) => recipe.title === generatedRecipe.title
    );
    if (alreadySaved) {
      toast({
        title: "Already Saved",
        description: "This recipe is already in your collection.",
      });
      return;
    }
    setSavedRecipes([...savedRecipes, generatedRecipe]);
    toast({
      title: "Recipe Saved!",
      description: `"${generatedRecipe.title}" has been added to your collection.`,
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <header className="pt-32 pb-6 text-center max-w-2xl w-full px-4">
        <h1 className="text-4xl sm:text-5xl font-bold flex justify-center items-center text-primary">
          <ChefHat className="mr-3 h-10 w-10 sm:h-12 sm:w-12" />
          SmartChef
        </h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base">
          Generate delicious recipes from what's in your fridge!
        </p>
      </header>

      <main className="w-full max-w-2xl px-4 flex-grow">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">What's in your fridge?</CardTitle>
            <CardDescription>
              Enter your ingredients, separated by commas, e.g., chicken breast, broccoli, soy sauce.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleGenerateRecipe)} id="ingredient-form">
              <CardContent>
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="ingredients-input" className="sr-only">Ingredients</FormLabel>
                      <FormControl>
                        <Textarea
                          id="ingredients-input"
                          placeholder="e.g., eggs, cheese, bread, tomatoes..."
                          className="min-h-[100px] resize-none focus:ring-accent focus:ring-2"
                          {...field}
                          aria-label="Ingredients input"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto transition-all duration-200 hover:scale-[1.02]" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-5 w-5" />
                  )}
                  Generate Recipe
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {error && (
          <Alert variant="destructive" className="shadow-md mt-6">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {generatedRecipe && !isLoading && (
          <Card className="shadow-lg animate-fadeIn mt-6">
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-fadeIn {
                animation: fadeIn 0.5s ease-out forwards;
              }
            `}</style>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center text-primary">
                <Utensils className="mr-2 h-7 w-7" /> {generatedRecipe.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-xl mb-2 flex items-center text-accent-foreground">
                  <Carrot className="mr-2 h-6 w-6 text-accent" /> Ingredients:
                </h3>
                <ul className="list-disc list-inside space-y-1 pl-4 text-foreground/90">
                  {generatedRecipe.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2 flex items-center text-accent-foreground">
                  <ClipboardList className="mr-2 h-6 w-6 text-accent" /> Instructions:
                </h3>
                <ol className="list-decimal list-inside space-y-2 pl-4 text-foreground/90">
                  {generatedRecipe.instructions.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => handleFeedback('like')} aria-label="Like this recipe">
                  <ThumbsUp className="mr-2 h-4 w-4" /> Like
                </Button>
                <Button variant="outline" onClick={() => handleFeedback('dislike')} aria-label="Dislike this recipe">
                  <ThumbsDown className="mr-2 h-4 w-4" /> Dislike
                </Button>
              </div>
              <Button onClick={handleSaveRecipe} aria-label="Save this recipe">
                <Bookmark className="mr-2 h-4 w-4" /> Save Recipe
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>

      <footer className="mt-12 mb-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Fridge Feast. All rights reserved.</p>
      </footer>
    </div>
  );
}

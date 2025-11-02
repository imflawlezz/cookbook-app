import { Recipe } from '../types/Recipe';

export const sampleRecipes: Omit<Recipe, 'id' | 'createdAt' | 'isFavorite'>[] = [
  {
    name: 'Chocolate Chip Cookies',
    ingredients: `2 1/4 cups all-purpose flour
1 teaspoon baking soda
1 teaspoon salt
1 cup butter, softened
3/4 cup granulated sugar
3/4 cup packed brown sugar
2 large eggs
2 teaspoons vanilla extract
2 cups chocolate chips`,
    instructions: `Preheat oven to 375°F (190°C).
Mix flour, baking soda, and salt in a small bowl.
Beat butter, sugars, eggs, and vanilla in a large bowl.
Gradually blend in flour mixture.
Stir in chocolate chips.
Drop rounded tablespoons onto ungreased baking sheets.
Bake for (9:00) to 11 minutes or until golden brown.
Cool on baking sheets for (2:00) minutes before removing.`,
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1364',
  },
    {
        name: 'Margherita Pizza',
        ingredients: `1 pizza dough ball
1/2 cup tomato sauce
200g fresh mozzarella cheese
Fresh basil leaves
2 tablespoons olive oil
Salt to taste`,
        instructions: `Preheat oven to 250°C (480°F).
Stretch the pizza dough on a floured surface.
Transfer dough to a pizza peel or baking sheet.
Spread tomato sauce evenly over the dough.
Tear mozzarella and distribute over the sauce.
Drizzle with olive oil and sprinkle with salt.
Bake in the preheated oven (10:00-12:00).
Remove when crust is golden and cheese is bubbly.
Garnish with fresh basil leaves before serving.`,
        imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2369',
    },
    {
        name: 'Creamy Mushroom Pasta',
        ingredients: `400g fettuccine pasta
500g cremini mushrooms
1 onion
3 cloves garlic
1 cup heavy cream
1/2 cup grated Parmesan cheese
3 tablespoons butter
2 tablespoons olive oil
Fresh parsley
Salt and black pepper`,
        instructions: `Cook pasta in salted boiling water according to package directions.
Slice mushrooms and dice the onion.
Mince the garlic and chop the parsley.
Heat olive oil and 1 tablespoon butter in a large pan.
Sauté onions until translucent (3:00).
Add mushrooms and cook until browned (7:00).
Add garlic and cook until fragrant (1:00).
Pour in heavy cream and bring to a simmer.
Stir in Parmesan cheese until melted.
Add cooked pasta to the sauce with remaining butter.
Toss to combine and season with salt and pepper.
Garnish with fresh parsley before serving.`,
        imageUrl: 'https://images.unsplash.com/photo-1600345968497-bb0c69de64f8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2370',
    },
    {
        name: 'Beef Tacos',
        ingredients: `500g ground beef
8 taco shells
1 onion
2 tomatoes
1 cup shredded lettuce
1 cup grated cheddar cheese
2 teaspoons taco seasoning
2 cloves garlic
Sour cream
Salsa
2 tablespoons vegetable oil`,
        instructions: `Dice the onion and tomatoes.
Shred the lettuce and grate the cheese.
Heat oil in a skillet over medium-high heat.
Sauté half of the onion until soft (3:00).
Add ground beef and cook until browned (5:00).
Add taco seasoning and minced garlic.
Stir in 1/4 cup of water and simmer (3:00).
Warm taco shells according to package directions.
Fill each shell with the beef mixture.
Top with lettuce tomato cheese and remaining onion.
Serve immediately with sour cream and salsa.`,
        imageUrl: 'https://images.unsplash.com/photo-1683062332605-4e1209d75346?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2472',
    },
    {
        name: 'Greek Salad',
        ingredients: `3 large tomatoes
1 cucumber
1 red onion
200g feta cheese
1/2 cup Kalamata olives
2 tablespoons olive oil
1 teaspoon dried oregano
Salt and black pepper`,
        instructions: `Wash and chop tomatoes into chunks.
Peel and slice the cucumber.
Thinly slice the red onion.
Cut feta cheese into cubes.
Combine tomatoes cucumber onion and olives in a large bowl.
Add olive oil oregano salt and pepper.
Toss gently to combine all ingredients.
Add feta cheese on top.
Let the salad rest at room temperature (10:00).
Serve with crusty bread if desired.`,
        imageUrl: 'https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2479',
    },
    {
        name: 'Banana Smoothie',
        ingredients: `2 ripe bananas
1 cup milk
1/2 cup yogurt
2 tablespoons honey
1 teaspoon vanilla extract
1 cup ice cubes`,
        instructions: `Peel the bananas and break into chunks.
Add bananas to the blender.
Pour in milk and yogurt.
Add honey and vanilla extract.
Add ice cubes to the blender.
Blend on high speed until smooth (1:00).
Taste and adjust sweetness if needed.
Pour into glasses and serve immediately.`,
        imageUrl: 'https://images.unsplash.com/photo-1685967836529-b0e8d6938227?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987',
    }
];


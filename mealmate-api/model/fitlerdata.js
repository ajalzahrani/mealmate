const menuItems = [
  "Boiled egg",
  "White cheese",
  "Jam + butter",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Fruit",
  "Water",
  "Foul medames with tomato",
  "Wedge cheese",
  "honey + Labna",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "Chicken creamy soup",
  "Italian grilled chicken",
  "Sautéed vegetables",
  "White rice",
  "Italian green salade with toasted bread",
  "Bread (brown –white)",
  "Juice",
  "vermicelli soup",
  "Lasagna with meet",
  "Sautéed vegetables",
  "Vegetable rice",
  "Hummus",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "Orzo soup",
  "chicken kofta with sauce",
  "steamed broccoli",
  "Bokhari rice",
  "Green salade",
  "Bread (brown –white)",
  "Dessert",
  "Water",
  "carrot soup",
  "Chicken chops with sauce",
  "steamed broccoli",
  "Haba haba rice",
  "Green salade",
  "Bread (brown –white)",
  "Dessert",
  "Water",
  "Labnah Sandwich",
  "Water +Juice",
  "Corn flakes + omelette with dill",
  "Slice cheese",
  "halawa + Labna",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "Shakshuka",
  "White cheese",
  "Jam + honey",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Fruit",
  "Water",
  "harrira soup",
  "Baked fish with tahena",
  "Sayadiyah rice",
  "Mixed vegetables idam",
  "Tahini salade",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "pumpkin soup",
  "Italian grilled chicken",
  "rice (yellow)",
  "Mixed vegetables idam",
  "Beet root salade",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "oatssoup",
  "Shish tawok",
  "Green beansidam",
  "White rice",
  "Dogus",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "Vegetable creamysoup",
  "chicken tandoori",
  "Green beansidam",
  "Mandi rice",
  "Dogus",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "Spinach Croissant Pie",
  "Water +Tea",
  "Scramble egg with mushrooms",
  "Wedge cheese",
  "Jam + butter",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "lentil",
  "Slice cheese",
  "Labna + honey",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Fruit",
  "Water",
  "vegetable soup",
  "Lamb biryani",
  "Bamya sutee",
  "Biryani Rice",
  "Motable",
  "Bread (brown –white)",
  "Juice",
  "lentil soup",
  "broasted chicken",
  "Bamya sutee",
  "Vermicelli rice",
  "Greek salad",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "chicken noodles soup",
  "Chicken shawerma",
  "Potatoidam",
  "Haba haba rice",
  "Dogus",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "carrot soup",
  "Italian grilled chicken",
  "Potatoidam",
  "Bokhari rice",
  "Dogus",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "Cheese Sandwich",
  "Water + Juice",
  "Hot dog slices with vegetables",
  "White cheese",
  "halawa + Labna",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "Boiled egg +pancake",
  "Wedge cheese",
  "Jam+ butter",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Fruit",
  "Water",
  "Orzo soup",
  "oven roasted fish",
  "cowpea edam",
  "Rice with nuts",
  "Fatush salade with pomegrante",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "Vegetable creamysoup",
  "ChickenKofta",
  "cowpea edam",
  "Kabsa rice",
  "Motable",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "Pumpkin soup",
  "Chicken chops with sauce",
  "Sautéed vegetables",
  "Macaroni spaghiti with sauce",
  "Tabboula",
  "Bread (brown –white)",
  "Dessert",
  "Water",
  "Vermicelli soup",
  "chicken kofta with sauce",
  "Sautéed vegetables",
  "rice (yellow)",
  "Tabboula",
  "Bread (brown –white)",
  "Dessert",
  "Water",
  "Zaater Croissant Pie",
  "Water + Tea",
  "Foul medames Lebanese style",
  "Slice cheese",
  "Labna + honey",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Fruit",
  "Water",
  "Egg with vegetables",
  "White cheese",
  "Jam + butter",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "Carrot soup",
  "Lamb stew with okra",
  "Courgettes edam",
  "Vermicelli rice",
  "Mixed bean salad",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "oatssoup",
  "chicken biryani",
  "Courgettes edam",
  "Vegetable rice",
  "Cucmber labn salade",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "harira soup",
  "Mandi chicken",
  "Molokhia",
  "Mandi rice",
  "Cucmber labn salade",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "Lentil Soup",
  "Italian grilled chicken",
  "Molokhia",
  "White rice",
  "Cucmber labn salade",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "Tuna sandwich",
  "Water + Juice",
  "Seasoned lentil",
  "Wedge cheese",
  "halawa + Labna",
  "Bread (brown –white)",
  "Juice",
  "Milk (Regular - low fat)",
  "Water",
  "Scramble egg",
  "White cheese",
  "butter + Jam",
  "Bread (brown –white)",
  "Fruit",
  "Milk (Regular - low fat)",
  "Water",
  "Vegetable creamysoup",
  "Grilled chicken with tomato",
  "Mixed vegetable casserole",
  "Macaroni with vegetables and garlic",
  "Green salade",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "Chicken creamy soup",
  "Baked chicken with vegetables",
  "Mixed vegetable casserole",
  "Kabsa rice",
  "Arugula salade",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "Jareesh Soup",
  "chicken breast",
  "Kabsa rice",
  "Grean peas idam",
  "Dogus",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "Vegetable soup",
  "Grilled chicken",
  "White rice",
  "Grean peas idam",
  "Dogus",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "Chicken Croissant Pie",
  "Water + Tea",
  "Hamsa tuna with",
  "Wedge cheese",
  "butter+ Jam",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "Boiled egg +pancake",
  "Slice cheese",
  "Labna + honey",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "Oats soup",
  "chicken breast",
  "Okra casserole",
  "rice (yellow)",
  "Fatush salade with pomegrante",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "lentil soup",
  "Mandi chicken",
  "Okra casserole",
  "Baked potato wedges",
  "Green salade",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "Orzo soup",
  "Baked chicken with vegetables",
  "Cauliflower Edam",
  "Vegetable rice",
  "Green salade",
  "Bread (brown –white)",
  "Dessert",
  "Water",
  "vermicelli soup",
  "Chicken Kofta with Tomato Sauce",
  "Cauliflower Edam",
  "Haba haba rice",
  "Green salade",
  "Bread (brown –white)",
  "Dessert",
  "Water",
  "Egg Sandwich",
  "Water +Juice",
  "Beans in the oven",
  "White cheese",
  "halawa + Labna",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "Shakshuka",
  "Wedge cheese",
  "Jam+ butter",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Fruit",
  "Water",
  "lentil soup",
  "Mosaga",
  "bachamel",
  "Kabsa rice",
  "Arugula salade",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "vegetable soup",
  "Chicken lemon sauce",
  "bachamel",
  "Vegetable rice",
  "Arugula salade",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "lentil soup",
  "Chicken chops with sauce",
  "Kabsa rice",
  "Tabola",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "pumpkin soup",
  "Chicken kofta with sauce",
  "White Rise",
  "Tabola",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "labnah sandwich",
  "Water +Tea",
  "Corn flakes+ tamiya",
  "Wedge cheese",
  "honey + Labna",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "Foul medames with tomato",
  "Slice cheese",
  "halawa + Labna",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Fruit",
  "Water",
  "Risoni Soup",
  "grilledfish",
  "Mixed vegetables idam",
  "White rice",
  "Tahini salade",
  "Bread (brown –white)",
  "Labna ( skimmed-low fat )",
  "Water",
  "pumpkin soup",
  "ChickenKofta",
  "Mixed vegetables idam",
  "Margog",
  "Greek salad",
  "Bread (brown –white)",
  "Labna ( skimmed-low fat )",
  "Water",
  "carrot soup",
  "Grilled chicken",
  "Marrow with carrot idam",
  "Spaghetti",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "Vegetable soup",
  "Chicken with cream and mushroom",
  "Marrow with carrot idam",
  "Fried potato +corn with butter",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "cheese sandwish",
  "Water + Juice",
  "Hot dog slices with vegetables",
  "White cheese",
  "halawa + Labna",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "Scramble egg",
  "Wedge cheese",
  "Jam+ butter",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Fruit",
  "Water",
  "Chicken creamy soup",
  "LAMB CHOP BBQ",
  "courgettes edam",
  "Vermicelli rice",
  "Arugula salade",
  "Bread (brown –white)",
  "Laban (Regular - low fat)",
  "Water",
  "oatssoup",
  "shish kebab",
  "courgettes edam",
  "rice (yellow)",
  "Cucmber labn salade",
  "Bread (brown –white)",
  "Laban (Regular - low fat)",
  "Water",
  "oatssoup",
  "chicken tandoori",
  "Green beansidam",
  "White rice",
  "Arugula salade",
  "Bread (brown –white)",
  "Dessert",
  "Water",
  "Chicken creamy soup",
  "shish kebab",
  "Green beansidam",
  "White rice",
  "Arugula salade",
  "Bread (brown –white)",
  "Dessert",
  "Water",
  "Zaater Croissant Pie",
  "Water + Tea",
  "Lamb liver",
  "Wedge cheese",
  "Labna + honey",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Fruit",
  "Water",
  "Boiled egg +pancake",
  "Slice cheese",
  "halawa + Labna",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "harrira soup",
  "oven roasted fish",
  "Sautéed vegetables",
  "Sayadiyah rice",
  "Hummus",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "Chicken creamy soup",
  "broasted chicken",
  "Sautéed vegetables",
  "nuts rice",
  "Mutabal",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "carrot soup",
  "chicken biryani",
  "cowpea edam",
  "Biryani Rice",
  "Greensalade with onion",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "Creamy corn soup",
  "chicken breast",
  "cowpea edam",
  "Vermicelli rice",
  "Green salade",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "Tuna sandwich",
  "Water + Juice",
  "Foul medames with tomato",
  "white cheese",
  "butter+ Jam",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "boiled eggs",
  "slice cheese",
  "honey + Labna",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Fruit",
  "Water",
  "barley soup",
  "Grilled meat Kofta",
  "Okra casserole",
  "Fatush salade with pomegrante",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "Carrot soup",
  "Grilled Chicken",
  "Okra casserole",
  "Vegetable rice",
  "Green salade",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "lentil soup",
  "ChickenKofta",
  "mixed vegetables",
  "Bokhari rice",
  "Dogus",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "pumpkin soup",
  "Grilled Chicken",
  "mixed vegetables",
  "Haba haba rice",
  "Greensalade with onion",
  "Bread (brown –white)",
  "Juice",
  "Water",
  "Chicken Croissant Pie",
  "Water + Tea",
  "Seasoned lentil",
  "Slice cheese",
  "halawa + Labna",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Fruit",
  "Water",
  "Shakshuka",
  "Wedge cheese",
  "Labna + honey",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "Vegetable soup",
  "chicken mandi",
  "Spinach with lentil",
  "rice (yellow)",
  "Arugula Salad",
  "Bread (brown –white)",
  "laban",
  "Water",
  "Vermicelli soup",
  "chicken breast",
  "Spinach with lentil",
  "White rice",
  "Tahina Salad",
  "Bread (brown –white)",
  "Yogurt",
  "Water",
  "pumpkin soup",
  "Chickenshawerma",
  "Grean peas idam",
  "rice (yellow)",
  "Hummus",
  "Bread (brown –white)",
  "Dessert",
  "Water",
  "Chicken creamy soup",
  "shish kebab",
  "Grean peas idam",
  "Kabsa rice",
  "Hummus",
  "Bread (brown –white)",
  "Dessert",
  "Water",
  "Egg Sandwich",
  "Water + Juice",
  "Scramble egg with mushrooms",
  "White cheese",
  "Jam+ butter",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Juice",
  "Water",
  "Corn flakes+ tamiya",
  "Slice cheese",
  "Labna + honey",
  "Bread (brown –white)",
  "Milk (Regular - low fat)",
  "Fruit",
  "Water",
  "Creamy corn soup",
  "Grilled chicken",
  "Molokhia",
  "Vegetable rice",
  "Green salade",
  "Bread (brown –white)",
  "lentil soup",
  "chicken biryani",
  "Molokhia",
  "Biryani Rice",
  "Cucmber labn salade",
  "Bread (brown –white)",
  "Fruit",
  "Water",
  "Orzo soup",
  "Chicken chops with sauce",
  "Potatoidam",
  "White rice",
  "Green salade",
  "Fruit",
  "Bread (brown –white)",
  "Water",
  "oatssoup",
  "Chicken with cream and mushroom",
  "Potatoidam",
  "Rice with vermicelli",
  "Green salade",
  "Fruit",
  "Bread (brown –white)",
  "Water",
  "Labnah Sandwich",
  "Water + Juice",
];

const uniqueitems = [...new Set(menuItems)];

uniqueitems.forEach((element) => {
  console.log(`'${element}',`);
});

---
layout: post
title: Test-Page
---

In this write up, I intend to gather a list of tips that have helped me approach unknown algorithm/coding interview questions. Appropriate use of data structures and algorithms is out of scope for this post. Instead, I will focus on generic tips that one can use to simplify the problem and consequently, its solution. The following problem statement is a question I have faced recently in a technical interview. The Problem Statement:
You will be a writing a product price map. Similar to something you would use
to power a website like Amazon. Specifically, I would like you to implement
two functions, addProduct and listProducts. addProduct takes a product name,
seller name and the price and adds it to your mapping. listProducts retrieves
the average price per product in your mapping. You can create whatever classes
necessary. Here are the functions stubbed out for your benefit:

void addProduct(String product, String seller, Double price); Map<String, Double> listProducts(); Before writing code, I needed to get a few things out of the way. I noticed the question was left ambiguous in many aspects. It’s easy to mistake this for carelessness on the interviewer’s part. In reality, they are testing you. They want to see if you ask the right questions to resolve the ambiguity. If you don’t clarify the ambiguous portions of the problem, you really won’t know what you are solving.


Tip #1: Always clarify the ambiguities of the problem statement. Here are some questions I asked to fight ambiguity: Q: Why is the name of the seller important in the context of the question? A: Because, if you re-add a product with the same seller and a different price, I would like you to overwrite the previous price for that product. Q: What does addProduct return? A: It doesn’t return anything. Q: What does listProducts return? A: It should return the average price across sellers for each product in your map so far. e.g. void addProduct(String product, String seller, Double price); /** returns mapping: { "pen": 10.0, "car": 5500.75, ....... } */ Map<String, Double> listProducts(); Great! Next step was to decide which tool I would use to solve this problem.

Tip #2: Ask if it’s okay to use your language of choice. SPOILER: It’s almost always okay. Interviewers want you to feel comfortable when solving a question. Generally speaking, they will be okay with you using your language of preference. In the rare occasion they aren’t, it’s important to explain even the most trivial bits of code as you write them. In my case, the interviewer was more than happy to have me solve the question in python3.


Tip #3: Ask what you are optimizing the solution for (e.g. memory, runtime etc.). Before starting to brainstorm for a solution, I wanted to make sure I was on the right path so to speak. I don’t want to devise a space optimized solution if what my interviewer is interested in is a fast lookup. Remember, sometimes optimization for space can sacrifice runtime and vice-versa. You want to make sure you are optimizing for what you’re told. In my case, the interviewer wanted me to optimize the functions for runtime.


Tip #4: Modify the stubbed out code to your language of choice and add documentation to reflect your goal. Once I had clarified the ambiguity in the question, established my language of choice and settled on my goal for the solution, I began to rewrite the original problem statement to include all this information. Why? Writing down this information would help me stay focused on my goal as I race against time to invent a solution.

Rewriting functions to follow python3 conventions """takes in product (str) seller (str) and price(float) and updates product map. Creates new entry if mapping doesn't exist already. If it exists, update to new price. returns nothing. """ def add_product(product, seller, price): #TODO """ returns a mapping of products to their average price across sellers. """ def list_products(): # TODO Now, I was going to put my head down and concentrate on solving the problem in full silence. Right? WRONG!


Tip #5: Think out loud. Listen closely for hints. Use a scratchpad. I know some of you might prefer working in silence, but I strongly believe it is crucial to think out loud and talk through the problem as you approach it. There are many advantages to this. First of all, you can hear yourself explaining your logic. So, if there are any glaring errors in it, you will be able to correct yourself before you’ve even started. Secondly, you let the interviewer hear how you think. At the end of the day, the interviewer is there to evaluate your thought process. Additionally, if you’ve said anything to indicate you are obviously headed down the wrong path, they will throw hints to course correct you. Which in turn means that it is essential to pay close attention to your interviewer throughout the process. Most of the time, there is a deliberate reason for what an interviewer will say (or won’t say). I also use a scratchpad to write important notes if necessary. I have found this helps for the more complex problems.


Tip #6: Attempt a working, albeit naive, solution. For my first attempt, I will typically come up with a solution that’s “good enough”, even if it’s a brute force, naive solution. The important part here is to recognize that you have a simple brute force solution that works. Go ahead and implement it. I have found after you write a first pass of your solution, it is easier to detect the bottlenecks in your code. Go through each block of your code, analyze the runtime and strategize for optimization. Having a working solution, no matter how naive, is always good for your confidence. You don’t want to waste too much time chasing the perfect solution and rush through the coding portion. This will inevitably lead to compromising the quality of code.


Bonus Tip #6.5: Choose variable names for maximum readability. I have heard conflicting opinions on this. My personal preference is to name variables in a descriptive manner. This helps me follow my code easily. For some, this has the exact opposite effect. They prefer picking concise variable names. At the end of the day, you want to name the variables for maximum readability for both yourself and the interviewer. Anyway, this is what my v1 solution looked like:

# Rewriting functions to follow python3 conventions
from collections import defaultdict

class ProductMap:
    def __init__(self):
        # Store all prices per seller per product
        self.product_price_map_per_seller = defaultdict(dict)
        # Store average price per product in a dict for fast lookup
        self.avg_price_per_product = defaultdict(dict)

    """
    takes in product (str) seller (str) and price(float) and updates product map. Creates
    new entry if mapping doesn't exist already. If it exists, update to new price. returns
    nothing.
    Runtime Complexity O(N)
    """
    def add_product(self, product, seller, price):
        # Add product to map
        self.product_price_map_per_seller[product][seller] = price
        # Calculate new average. Update map with value.
        prices_for_product = [price for _, price in self.product_price_map_per_seller[product].items()]
        self.avg_price_per_product[product] = sum(prices_for_product)/len(prices_for_product)

    """
    returns a mapping of products to their average price across sellers.
    Runtime Complexity O(1)
    """
    def list_products(self):
        return self.avg_price_per_product
I was pretty content with my solution at this point. My code had a well optimized O(1) runtime complexity for list_products, which I wanted. My other function, add_product() had an O(N) runtime. I could live with that. But how could I be really sure?


Tip #7: Run through a few test cases. Test cases instill confidence in your code. Walk through at least one standard test case that gives you maximum code coverage. If you have time, walk through a few edge cases. In my case I walked through the states of self.product_price_map_per_seller and self.avg_price_per_product as I ran through the following function invocations:


p = ProductMap()
p.add_product("pen", "bic", 10.0) 
p.add_product("notebook", "walmart", 3.99)
p.add_product("pen", "montblanc", 1000.0)
p.add_product("pen", "bic", 4.99)
p.list_products()

My interviewer nodded along as I explained my code and finally broke his silence once I was done. This looks good. But, do you think it’s possible to optimize the runtime for add_product()?

Tip #8: Listen to the feedback your interviewer gives you. Use the hints to better your solution if possible. In my case, the hint was pretty darn obvious. Since he asked, I knew there was a smarter way to calculate the average price for each product. I started to analyze my add_product() function line by line. Line #20 — Upserting the price for a seller by product was O(1). I think this is fine. Line #22 — Creating the list of prices for each product was O(N). Aha! potential bottleneck. Line #23 — Summing the list was O(N). Another bottleneck! I needed to somehow calculate the average of the prices without having to visit every price for a product. How could I do that? I guess I could keep a rolling average. But, that only works if I am guaranteed to see new values only. My program is intended to have updates to old prices (if a seller for a certain product calls add_product() with a different price from the original).


I wonder if I could somehow account for this price update. I could keep a running total of price and total unique sellers count for each product. If a seller updates the price for a certain product, I could deduct the old price from the running total and add the new price. Dividing the running total by the total unique sellers count would give me the average. I could then update my average price per product dictionary with this value for fast lookup. The interviewer seemed happy with my train of thought. So, I went ahead and did exactly that.

# Rewriting functions to follow python3 conventions
from collections import defaultdict

class ProductMap:
    def __init__(self):
        # Store all prices per seller per product
        self.product_price_map_per_seller = defaultdict(dict)
        # running total and unique seller count per product
        self.running_total_and_seller_count = defaultdict(dict)
        # Store average price per product in a dict for fast lookup
        self.avg_price_per_product = defaultdict(dict)

    """
    takes in product (str) seller (str) and price(float) and updates product map. Creates
    new entry if mapping doesn't exist already. If it exists, update to new price. returns
    nothing.
    Runtime Complexity O(1)
    """
    def add_product(self, product, seller, price):
        # Update or create running total and seller count depending on the context
        if seller in self.product_price_map_per_seller.get(product, {}):
            self.running_total_and_seller_count[product]['running_total'] += price - self.product_price_map_per_seller[product][seller]
        else:
            if product in self.running_total_and_seller_count:
                self.running_total_and_seller_count[product]['running_total'] += price
                self.running_total_and_seller_count[product]['seller_count'] += 1
            else:
                self.running_total_and_seller_count[product]['running_total'] = price
                self.running_total_and_seller_count[product]['seller_count'] = 1
        # Add product to map
        self.product_price_map_per_seller[product][seller] = price
        # Calculate new average. Update map with value.
        self.avg_price_per_product[product] = self.running_total_and_seller_count[product]['running_total']/self.running_total_and_seller_count[product]['seller_count']

    """
    returns a mapping of products to their average price across sellers.
    Runtime Complexity O(1)
    """
    def list_products(self):
        return self.avg_price_per_product
I ran my code through the same test case as before to make sure there were no bugs. The interviewer was happy with the improvements I made. So, we moved on to Q&A phase of the interview, officially marking the end of the coding portion. TL;DR: Here are the tips in a nice list: Always clarify the ambiguities of the problem statement. Ask if it’s okay to use your language of choice. SPOILER: It’s almost always okay. Ask what you are optimizing the solution for (e.g. memory, runtime etc.). Modify the stubbed out code to your language of choice and add documentation to reflect your goal. Think out loud. Listen closely for hints. Use a scratchpad. Attempt a working — albeit naive — solution. 6.5. Choose variable names for maximum readability. Run through a few test cases. Listen to the feedback your interviewer gives you. Use the hints to better your solution if possible. I hope this helped. If you have any feedback or handy tips that I missed, feel free to drop a note in my email!

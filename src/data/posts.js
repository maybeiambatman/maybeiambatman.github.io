export const posts = [
  {
    slug: 'system-design-sliders',
    title: 'System Design Sliders',
    date: '2026-01-09',
    content: 'A cheatsheet to help prepare for system design interviews.'
  },
  {
    slug: 'hatching-an-idea',
    title: 'Hatching An Idea',
    date: '2020-09-24',
    content: `![](/images/fpld.PNG)

My friends play [Fantasy Premier League Draft](https://draft.premierleague.com/) every season (think Fantasy Football, but with Soccer). I've refused to join them for 7 years now. Why? Because, I always end up drafting a player from a team I "sports hate". There's nothing worse than rooting for said player in the middle of a season when they are playing a crucial game against my favorite team, Manchester United. The guilt eats me alive. This year, I caved.

The season starts. We go through the draft and I don't recognize 90% of the players. Clearly, I have lost touch in the last 7 years. Despite my struggles I land a decent team. I think to myself, "I got this".

*Wrong.*

I lose my first matchup 41-38. I realize that I can't do this by myself. I don't know how to field a team that can win this fantasy league. So, I turn to the internet and all it's wisdom. I find a pretty nifty website called [Rotowire](https://www.rotowire.com/soccer/column.php?id=188). They have rankings and projections every week that help clueless people like me pick their teams.

Awesome! Now I can just cross check players against Rotowire projections and pick up free agents and build the statistically best team. Easy peasy, right?

*Wrong.*

Going back and forth from the Fantasy Premier League Draft website and Rotowire website is tedious. It involves a series of Ctrl+F commands. The official website only ever shows 10 players at a time. I get tired of it all easily. There's no hope for me.

Then, I remember something, "Hey, I know how to code. Maybe I can just make a chrome extension that overlays the Rotowire projections on the FPL Draft website right?"

[Right](https://chrome.google.com/webstore/detail/fantastico/jjehgienoakeelhoegihepjpmdcoddeb?hl=en&authuser=0) :)`
  },
  {
    slug: 'how-i-used-my-rejections-to-land-a-software-engineering-job',
    title: 'How I Used My Rejections To Land A Software Engineering Job',
    date: '2019-04-19',
    content: `The year was 2015. After an arduous 5 years of undergraduate coursework, my time in college was close to an end. I was looking for my first full-time software engineering gig. Up until this point, I had never passed a traditional coding/algorithm interview. With a handful of interviews scheduled lined up, I was hoping this fact would soon change.

## Chapter 1: How hard could it be?

One of my first coding interviews was with [Twitch](https://www.twitch.tv/). [Amazon](https://www.amazon.com/) had just agreed to acquire them for $1B. [Twitch Plays Pokemon](https://en.wikipedia.org/wiki/Twitch_Plays_Pok%C3%A9mon) was the talk of the town. "Wow! This would totally be my dream job!" — I thought. Having spent about half of my free time in college playing video games, it felt like a match made in heaven.

Leading up to the interview, I hadn't spent much time preparing. I recall skimming through my brother's hand-me-down copy of [Cracking The Coding Interview](http://www.crackingthecodinginterview.com/). As you might expect, I didn't make it past their phone screen. Who knew printing a 2D matrix in spiral order would send my head spinning? "It's okay, I didn't wanna go there anyway." — I consoled myself.

## Chapter 2: Very hard.

A week later, I had two video/coding interviews set up with [Groupon](https://www.groupon.com/). My brother had interned there and he always spoke about the high quality of engineers they hire. "Groupon would be neat." — I thought.

At this point I had upped my game a little bit. I knew how to detect a cycle in a linked list. I was comfortable with arrays. Anything beyond that was still hazy. Unfortunately, my first interview would cover neither of those concepts. I was asked to solve a classic backtracking problem. I could feel the dread creeping in. I mumbled for about 30 minutes and wrote a few lines of code that clearly wasn't going to work. We both knew this was going poorly. My awful performance actually convinced them to cancel my second interview altogether. They had gathered enough signal to know the next interview would be a colossal waste of time for both of us. This remains to this day, my most embarrassing interview ever.

## Chapter 3: What do I do now?

Fast forward 2 weeks, I have somehow managed a few more phone interviews. 'Groupon incident' had done a number on my confidence. I didn't feel like studying anymore. Looking at practice problems made me sick to my stomach. As the next round of interviews crept up, I would spend most nights recapping my horror show of past interviews.

"Why didn't you study harder before the interview? You stupid f*ck."

![](/images/reject.png)

Before the day of my next interview, something happened. It is as if my fight or flight reflex had kicked in, and my mind decided to fight. I had grown tired of my own mopey attitude. I needed to be better. Failing was not an option.

"But, How do I prevent myself from inevitable procrastination?" — I wondered.

I realized my rejections motivated me. I felt disappointed and angry. And this lit a fire in me. I grabbed a few post-it notes and scribbled down every company that had rejected me after an interview. I stuck them up on the wall right in front of me. I wanted to remember this visceral feeling and use it as fuel to stay focused. And you know what? It worked. Anytime I felt like giving up or slacking off, the little yellow notes reminded me how far I was from my goal.

## Chapter 4: Happy ending

I went on to fail 9 more interviews, for a grand total of 11, before I landed my first offer (at [RetailMeNot](https://www.retailmenot.com/)). In retrospect, did I handle my rejections in a healthy way? I don't know, you tell me.

Seriously, please tell me.`
  },
  {
    slug: 'tips-on-how-to-approach-a-coding-interview-question',
    title: 'Tips On How To Approach A Coding Interview Question',
    date: '2018-06-13',
    content: `*In this write up, I intend to gather a list of tips that have helped me approach unknown algorithm/coding interview questions. Appropriate use of data structures and algorithms is out of scope for this post. Instead, I will focus on generic tips that one can use to simplify the problem and consequently, its solution. The following problem statement is a question I have faced recently in a technical interview.*

![](https://miro.medium.com/max/6000/1*N2lSvZ8bKl1jAxUNJHIbJQ.jpeg)

## The Problem Statement

\`\`\`java
/*
You will be a writing a product price map. Similar to something you would use
to power a website like Amazon. Specifically, I would like you to implement
two functions, addProduct and listProducts. addProduct takes a product name,
seller name and the price and adds it to your mapping. listProducts retrieves
the average price per product in your mapping. You can create whatever classes
necessary. Here are the functions stubbed out for your benefit:
*/

void addProduct(String product, String seller, Double price);

Map<String, Double> listProducts();
\`\`\`

Before writing code, I needed to get a few things out of the way.

I noticed the question was left ambiguous in many aspects. It's easy to mistake this for carelessness on the interviewer's part. In reality, they are testing you. They want to see if you ask the right questions to resolve the ambiguity. If you don't clarify the ambiguous portions of the problem, you really won't know what you are solving.

### Tip #1: Always clarify the ambiguities of the problem statement.

Here are some questions I asked to fight ambiguity:

**Q**: Why is the name of the seller important in the context of the question?

**A**: Because, if you re-add a product with the same seller and a different price, I would like you to overwrite the previous price for that product.

**Q**: What does addProduct return?

**A**: It doesn't return anything.

**Q**: What does listProducts return?

**A**: It should return the average price across sellers for each product in your map so far. e.g.

\`\`\`java
void addProduct(String product, String seller, Double price);

/**
returns mapping:
{
    "pen": 10.0,
    "car": 5500.75,
    .......
}
*/
Map<String, Double> listProducts();
\`\`\`

Great! Next step was to decide which tool I would use to solve this problem.

### Tip #2: Ask if it's okay to use your language of choice. SPOILER: It's almost always okay.

Interviewers want you to feel comfortable when solving a question. Generally speaking, they will be okay with you using your language of preference. In the rare occasion they aren't, it's important to explain even the most trivial bits of code as you write them.

In my case, the interviewer was more than happy to have me solve the question in **python3**.

### Tip #3: Ask what you are optimizing the solution for (e.g. memory, runtime etc.).

Before starting to brainstorm for a solution, I wanted to make sure I was on the right path so to speak. I don't want to devise a space optimized solution if what my interviewer is interested in is a fast lookup.

Remember, sometimes optimization for space can sacrifice runtime and vice-versa. You want to make sure you are optimizing for what you're told.

In my case, the interviewer wanted me to optimize the functions for **runtime**.

### Tip #4: Modify the stubbed out code to your language of choice and add documentation to reflect your goal.

Once I had clarified the ambiguity in the question, established my language of choice and settled on my goal for the solution, I began to rewrite the original problem statement to include all this information. Why?

Writing down this information would help me stay focused on my goal as I race against time to invent a solution.

\`\`\`python
# Rewriting functions to follow python3 conventions

"""
takes in product (str) seller (str) and price(float) and updates product map. Creates
new entry if mapping doesn't exist already. If it exists, update to new price. returns
nothing.
"""
def add_product(product, seller, price):
    #TODO

"""
returns a mapping of products to their average price across sellers.
"""
def list_products():
    # TODO
\`\`\`

Now, I was going to put my head down and concentrate on solving the problem in full silence. Right? **WRONG**!

### Tip #5: Think out loud. Listen closely for hints. Use a scratchpad.

I know some of you might prefer working in silence, but I strongly believe it is crucial to think out loud and talk through the problem as you approach it. There are many advantages to this.

First of all, you can hear yourself explaining your logic. So, if there are any glaring errors in it, you will be able to correct yourself before you've even started.

Secondly, you let the interviewer hear how you think. At the end of the day, the interviewer is there to evaluate your thought process. Additionally, if you've said anything to indicate you are obviously headed down the wrong path, they will throw hints to course correct you.

Which in turn means that it is essential to pay close attention to your interviewer throughout the process. Most of the time, there is a deliberate reason for what an interviewer will say (or won't say).

I also use a scratchpad to write important notes if necessary. I have found this helps for the more complex problems.

### Tip #6: Attempt a working, albeit naive, solution.

For my first attempt, I will typically come up with a solution that's "good enough", even if it's a brute force, naive solution. The important part here is to recognize that you have a simple brute force solution that works. Go ahead and implement it. I have found after you write a first pass of your solution, it is easier to detect the bottlenecks in your code. Go through each block of your code, analyze the runtime and strategize for optimization.

Having a working solution, no matter how naive, is always good for your confidence. You don't want to waste too much time chasing the perfect solution and rush through the coding portion. This will inevitably lead to compromising the quality of code.

### Bonus Tip #6.5: Choose variable names for maximum readability.

I have heard conflicting opinions on this. My personal preference is to name variables in a descriptive manner. This helps me follow my code easily. For some, this has the exact opposite effect. They prefer picking concise variable names. At the end of the day, you want to name the variables for maximum readability for both yourself and the interviewer.

Anyway, this is what my v1 solution looked like:

\`\`\`python
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
\`\`\`

I was pretty content with my solution at this point. My code had a well optimized O(1) runtime complexity for \`list_products\`, which I wanted. My other function, \`add_product()\` had an O(N) runtime. I could live with that. But how could I be really sure?

### Tip #7: Run through a few test cases.

Test cases instill confidence in your code. Walk through at least one standard test case that gives you maximum code coverage. If you have time, walk through a few edge cases.

In my case I walked through the states of \`self.product_price_map_per_seller\` and \`self.avg_price_per_product\` as I ran through the following function invocations:

\`\`\`python
p = ProductMap()
p.add_product("pen", "bic", 10.0)
p.add_product("notebook", "walmart", 3.99)
p.add_product("pen", "montblanc", 1000.0)
p.add_product("pen", "bic", 4.99)
p.list_products()
\`\`\`

My interviewer nodded along as I explained my code and finally broke his silence once I was done.

> This looks good. But, do you think it's possible to optimize the runtime for \`add_product()\`?

### Tip #8: Listen to the feedback your interviewer gives you. Use the hints to better your solution if possible.

In my case, the hint was pretty darn obvious. Since he asked, I knew there was a smarter way to calculate the average price for each product. I started to analyze my \`add_product()\` function line by line.

* Line #20 — Upserting the price for a seller by product was O(1). I think this is fine.
* Line #22 — Creating the list of prices for each product was O(N). Aha! potential bottleneck.
* Line #23 — Summing the list was O(N). Another bottleneck!

I needed to somehow calculate the average of the prices without having to visit every price for a product. How could I do that? I guess I could keep a rolling average. But, that only works if I am guaranteed to see new values only. My program is intended to have updates to old prices (if a seller for a certain product calls \`add_product()\` with a different price from the original).

I wonder if I could somehow account for this price update. I could keep a running total of price and total unique sellers count for each product. If a seller updates the price for a certain product, I could deduct the old price from the running total and add the new price. Dividing the running total by the total unique sellers count would give me the average. I could then update my average price per product dictionary with this value for fast lookup.

The interviewer seemed happy with my train of thought. So, I went ahead and did exactly that.

\`\`\`python
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
\`\`\`

I ran my code through the same test case as before to make sure there were no bugs. The interviewer was happy with the improvements I made. So, we moved on to Q&A phase of the interview, officially marking the end of the coding portion.

---

## TL;DR: Here are the tips in a nice list:

1. **Always clarify the ambiguities of the problem statement.**
2. **Ask if it's okay to use your language of choice. SPOILER: It's almost always okay.**
3. **Ask what you are optimizing the solution for (e.g. memory, runtime etc.).**
4. **Modify the stubbed out code to your language of choice and add documentation to reflect your goal.**
5. **Think out loud. Listen closely for hints. Use a scratchpad.**
6. **Attempt a working — albeit naive — solution.**
   6.5. **Choose variable names for maximum readability.**
7. **Run through a few test cases.**
8. **Listen to the feedback your interviewer gives you. Use the hints to better your solution if possible.**

I hope this helped. If you have any feedback or handy tips that I missed, feel free to drop a note in my email!`
  }
]

# Lookbook Lounge Ai

OUTFIT OASIS — MASTER BUILD PROMPT

V2 Functional MVP / AI Fashion Styling Platform

Build a polished, production-quality MVP web application called Outfit Oasis.

Outfit Oasis is a fashion-tech platform that combines:

AI-powered personal styling

Personal digital wardrobe

Clothing recognition/scanning

Pinterest-style fashion inspiration

Outfit creation and saving

Fashion marketplace/affiliate discovery

Personalized style preferences

A future premium subscription called Outfit Oasis+

The company is planned to launch from Myanmar in 2028, initially targeting Southeast Asia, particularly Myanmar and Thailand, with the long-term goal of expanding globally.

The product should feel like a serious startup product, not a generic AI-generated dashboard.

1. PRODUCT VISION

The central product idea is:

"Your personal AI stylist, powered by your wardrobe, inspired by the world, connected to the brands you love."

Outfit Oasis should solve a common everyday fashion problem:

People often buy individual clothing items they like but later struggle to understand how to style them, what to combine them with, what is appropriate for a specific occasion, or where to find complementary pieces.

Outfit Oasis solves this by allowing users to:

discover fashion inspiration

upload or scan clothing they own

build a digital wardrobe

receive personalized outfit recommendations

ask an AI stylist for advice

save and organize outfits

discover products

eventually purchase through partner retailers

The most important product philosophy is:

STYLE FIRST → SHOP SECOND

Do not make the app feel like an e-commerce marketplace first.

The primary user question should be:

"What should I wear?"

Not:

"What should I buy?"

2. BRAND POSITIONING

Brand name:

Outfit Oasis

Tagline:

LEVEL UP YOUR FASHION GAME

Alternative supporting positioning:

"Your personal AI stylist."

Brand personality:

fashionable

modern

intelligent

approachable

creative

youthful

premium but not intimidating

technologically advanced

culturally aware

Southeast Asian at its roots

globally ambitious

The product should feel like a combination of:

premium fashion editorial

Pinterest-style visual discovery

modern AI assistant

digital wardrobe

fashion commerce

Do NOT directly copy Pinterest, Instagram, TikTok, Zara, or any other existing company's UI.

Use them only as conceptual inspiration.

3. DESIGN DIRECTION

Create a sophisticated fashion-tech visual system.

The existing Outfit Oasis prototype has a warm, elegant aesthetic. Preserve the core identity but substantially improve the UI/UX.

Visual direction:

"Fashion editorial meets modern AI product."

Use a warm neutral foundation rather than a cold SaaS dashboard aesthetic.

Suggested palette:

Background:
#FEF9EA

Primary dark:
#2D2729

Muted plum:
#67595E

Warm secondary neutral:
#E9DFD2

White:
#FFFFFF

Soft gray:
#F5F3F0

Success:
#5C8064

Error:
#B85C5C

Accent should be used sparingly.

Do not overuse rounded cards.

Use:

generous whitespace

strong typography hierarchy

editorial imagery

subtle borders

soft shadows

elegant cards

large fashion imagery

clean iconography

restrained animation

The application should feel premium rather than childish.

4. RESPONSIVE REQUIREMENT

Although Outfit Oasis is conceived primarily as a mobile application, build the MVP as a highly responsive web application.

It must work beautifully on:

mobile

tablet

desktop

Mobile should feel like the primary experience.

Use a mobile-first layout.

Recommended mobile base:

390px wide design language.

Desktop should adapt naturally rather than simply stretching the mobile UI.

5. TECHNICAL ARCHITECTURE

Use a modern React-based application.

Use TypeScript.

Use Tailwind CSS or the project's existing styling system consistently.

Use reusable components.

Use Supabase for backend functionality.

Supabase should handle:

authentication

database

user profiles

wardrobe items

outfits

saved outfits

boards

preferences

products

brands

subscriptions

storage for user-uploaded images

Do not hard-code user data into the UI once the relevant database functionality exists.

Create a clean separation between:

UI

components

pages

data

services

AI services

database operations

Keep the code modular and maintainable.

If an external API is not configured yet, create a clean service abstraction and realistic mock/demo data instead of breaking the application.

6. AUTHENTICATION

Create:

Welcome screen

Login

Sign Up

Forgot Password

Reset Password

Logout

Authentication should use Supabase Auth.

Login should support:

email

password

Prepare the architecture so social authentication can later support:

Google

Apple

Do not fake successful authentication.

Handle:

invalid credentials

missing fields

loading states

success states

errors

7. ONBOARDING

After registration, users should go through a short personalization flow.

Do not make onboarding unnecessarily long.

Collect:

Basic information

name

optional profile photo

Style preferences

Allow multiple selections:

Minimal

Casual

Streetwear

Smart Casual

Formal

Vintage

Indie

Y2K

Sporty

Elegant

Bohemian

Other

Preferred colors

Allow multiple selections.

Typical occasions

Everyday

University

Work

Date

Party

Wedding

Travel

Formal events

Religious/cultural events

Other

Budget preference

Budget

Mid-range

Premium

Luxury

Shopping preferences

Local brands

Global brands

Both

Style personalization

Ask users what they want help with:

Daily outfits

Special occasions

Styling clothes I already own

Shopping

Finding my personal style

Store this information in Supabase.

This data should later influence AI recommendations.

8. APP NAVIGATION

Use a mobile bottom navigation.

Primary destinations:

HOME
DISCOVER
SCAN
WARDROBE
PROFILE

The Scan action should be visually emphasized but not obnoxious.

AI Stylist should be accessible from Home and relevant contexts.

On desktop, convert this into a clean sidebar or adaptive navigation.

Navigation must remain consistent across the application.

9. HOME

Home is the most important screen.

The purpose is to immediately answer:

"What should I wear?"

Top:

"Good morning, [Name]"

Then:

"What are we wearing today?"

Include a prominent AI Stylist entry point:

"Ask your AI stylist..."

Examples:

"What should I wear today?"

"Style my black T-shirt"

"What should I wear to a wedding?"

"Build me a casual weekend look"

10. DAILY OUTFIT

Create a prominent "Your Daily Edit" section.

Example:

YOUR DAILY EDIT

Smart Casual

"Perfect for today"

Show a large fashion image.

Display:

style

occasion

weather/context placeholder

AI match percentage

Example:

AI MATCH
94%

Actions:

View Outfit
Save
Share
Shop This Look

If real AI recommendations are not yet connected, use intelligent demo recommendations based on the user's stored preferences and wardrobe.

Do not claim a real AI model is running when it isn't.

11. HOME SECTIONS

Below the Daily Edit:

Trending For You

Horizontal fashion cards.

Categories:

Streetwear

Minimal

Smart Casual

Indie

Vintage

Formal

Weekend

Your Wardrobe

Show:

"You have 47 items"

Example statistics:

12 Tops
8 Bottoms
6 Shoes
5 Accessories

CTA:

"View wardrobe"

Quick Scan

Large CTA:

"Scan an item"

Supporting copy:

"Let AI build outfits around what you already own."

12. AI STYLIST

Create a dedicated AI Stylist experience.

This is NOT simply a generic chatbot.

Start with contextual actions:

"✨ Your AI Stylist"

"What can I help you wear?"

Quick actions:

"What should I wear?"

"Style something I own"

"Style me for an event"

"Find something to buy"

"Build an outfit"

"Help me find my style"

Then allow conversational input.

The AI Stylist should eventually consider:

wardrobe

style preferences

occasion

budget

colors

user feedback

weather

cultural context

previous outfits

For the MVP, implement the conversational interface and recommendation logic using a service abstraction.

If no AI API key is configured, provide a clearly structured demo/mock recommendation engine.

Do NOT expose fake API calls.

Create an AI service layer that can later connect to a real LLM/API.

13. AI RECOMMENDATION OUTPUT

When the AI creates an outfit, show:

OUTFIT NAME

Example:

"Urban Minimal"

AI MATCH:
94%

Items:

Oversized black T-shirt

Beige wide-leg trousers

White sneakers

Silver watch

Actions:

Save Outfit
Wear This
Shop This Look
Try Another

The user should be able to regenerate alternatives.

Example:

"Give me something more casual"

"Make it more colorful"

"Make it suitable for a formal event"

"Use only items in my wardrobe"

14. DISCOVER

Create a visual, Pinterest-inspired discovery feed.

Tabs:

For You
Trending
New
Styles
Occasions

The feed should contain visually strong fashion cards.

Each card should support:

Save

Like

Share

View outfit

Shop

Use masonry-style or responsive grid layouts where appropriate.

Do not make every card identical.

15. INSPIRATION BOARDS

Users should be able to create boards.

Examples:

"My Summer Fits"

"Work Outfits"

"Date Night"

"Streetwear"

"Wedding Ideas"

Allow:

create board

rename board

delete board

save outfit to board

remove outfit

view board

This should become a social/inspiration layer in the future.

16. SCAN FEATURE

Create a dedicated Scan experience.

Primary flow:

SCAN ITEM

↓

Camera/upload interface

↓

Image preview

↓

Analyze

↓

Detected item

↓

Confirm

↓

Add to Wardrobe

For MVP, support image upload.

Prepare the architecture for camera input.

After image upload, display:

"Analyzing your item..."

Then show:

BLACK OVERSIZED T-SHIRT

Category:
Tops

Color:
Black

Style:
Casual

Fit:
Oversized

Allow the user to edit the detected information.

Buttons:

Add to Wardrobe

Style This Item

Find Similar

Shop Similar

If actual computer vision is not connected, use a mock recognition layer.

Do not pretend that image recognition is fully production-ready.

17. WARDROBE

Create a beautiful digital wardrobe.

Header:

"My Wardrobe"

Stats:

47 items
12 tops
8 bottoms
6 shoes
5 accessories

Filters:

All
Tops
Bottoms
Dresses
Outerwear
Shoes
Accessories

Allow:

add item

edit item

delete item

favorite item

view item

search

filter

Each item should contain:

image

name

category

color

style

brand

optional price

optional purchase date

18. WARDROBE ITEM DETAIL

When a user opens an item:

Show large image.

Example:

BLACK OVERSIZED T-SHIRT

Category:
Top

Color:
Black

Style:
Casual

Then actions:

"Style This"

"Find Similar"

"Shop Similar"

"Add to Outfit"

Show:

"Looks you can create"

with AI-generated/demo outfit suggestions.

19. OUTFIT BUILDER

Create an outfit-building interface.

Categories:

Top
Bottom
Shoes
Outerwear
Accessories

Users should be able to select items from their wardrobe.

Display the outfit visually.

Actions:

Save Outfit
Name Outfit
Add to Board
Share
Shop Missing Items

The user should be able to see which pieces they already own and which pieces could be purchased.

20. OUTFIT DETAIL

Create a premium editorial-style outfit detail page.

Large outfit image/visual.

Title:

"Urban Minimal"

Tags:

Minimal
Casual
Everyday

AI Match:

94%

Then:

THE LOOK

Top
Bottom
Shoes
Accessories

For each item:

image

item name

owned / shop label

Actions:

Save
Share
Shop This Look

Also show:

"Similar Looks"

21. MARKETPLACE

The marketplace is NOT the primary home experience.

It exists to monetize styling intent.

Structure:

Marketplace

Search

Categories

Brands

Trending

Deals

Product cards should show:

image

product name

brand

price

category

Shop button

Users should primarily arrive at products through:

Outfit → Item → Shop

rather than browsing an endless generic marketplace.

For MVP, use seeded demo products.

Create database structures for:

brands
products
affiliate_links

Do not implement real affiliate integrations unless credentials/API access is available.

Instead use placeholder external links and clearly separate demo data from production integrations.

22. BRAND SYSTEM

Create a brand entity.

Fields:

name

logo

description

website

country

category

partner status

Seed example brands for demonstration purposes, but clearly treat them as demo/placeholder partner data unless actual partnerships exist.

Do not imply Outfit Oasis currently has commercial partnerships that do not exist.

23. PROFILE

Create:

Profile

User photo
Name
Username

Style Profile

Saved Outfits

Boards

Wardrobe

Outfit Oasis+

Settings

Logout

24. STYLE PROFILE

Allow users to update:

preferred styles

colors

occasions

budget

shopping preferences

personal style goals

Add:

"Improve my recommendations"

with a short explanation.

25. OUTFIT OASIS+

Create a premium subscription experience.

Do not make it aggressive.

Position it as:

OUTFIT OASIS+

"More personalization. More styling. More possibilities."

Free tier:

Basic AI styling

Basic wardrobe

Discovery

Limited scans

Saved outfits

Premium:

Advanced AI styling

More/expanded scans

Deeper personalization

Advanced wardrobe insights

Premium styling tools

Early access to new features

Initial business-model assumption:

3,000 MMK/month

However, make pricing configurable in the database rather than hard-coding the price throughout the UI.

Prepare architecture for future subscription/payment integration.

Do not implement fake payment processing.

26. BUSINESS MODEL

Outfit Oasis has three primary revenue streams.

1. Freemium subscription

Free user acquisition.

Premium Outfit Oasis+ subscription.

2. Affiliate/commerce revenue

Users discover products through outfits and recommendations.

Outfit Oasis can redirect users to retailers.

Potential future partners include global and local fashion brands.

3. Brand partnerships

Local and global brands can potentially showcase products and collections.

The application should therefore be architected around:

Users
Brands
Products
Outfits
Recommendations
Affiliate Links

27. DATABASE MODEL

Create a clean Supabase schema.

Suggested tables:

profiles

id
user_id
name
username
avatar_url
bio
created_at
updated_at

style_preferences

id
user_id
styles
colors
occasions
budget
shopping_preferences
style_goals
created_at
updated_at

wardrobe_items

id
user_id
name
image_url
category
subcategory
color
secondary_color
brand
size
fit
style
season
notes
created_at
updated_at

outfits

id
user_id
name
description
occasion
style
image_url
ai_match_score
created_at
updated_at

outfit_items

id
outfit_id
wardrobe_item_id
product_id
position
created_at

boards

id
user_id
name
description
cover_image_url
created_at
updated_at

board_outfits

id
board_id
outfit_id
created_at

likes

id
user_id
outfit_id
created_at

saved_outfits

id
user_id
outfit_id
created_at

brands

id
name
logo_url
description
website
country
partner_status
created_at

products

id
brand_id
name
description
image_url
category
price
currency
external_url
affiliate_url
created_at
updated_at

affiliate_links

id
product_id
partner
url
tracking_code
created_at

subscriptions

id
user_id
plan
status
price
currency
started_at
expires_at

ai_interactions

id
user_id
prompt
response
context
created_at

28. SECURITY

Use Supabase Row Level Security.

Users must only be able to modify their own:

profile

wardrobe

outfits

boards

preferences

AI interaction history

Public discovery content can be readable according to its visibility rules.

Never expose:

API keys

service role keys

private credentials

Use environment variables.

Do not put secret API keys into frontend code.

29. IMAGE STORAGE

Use Supabase Storage for:

profile images

wardrobe images

outfit images

board images

Create sensible storage organization.

Example:

profiles/{user_id}/
wardrobe/{user_id}/
outfits/{user_id}/
boards/{user_id}/

Handle:

upload

preview

delete

loading

errors

30. DEMO DATA

The application should look alive immediately after development.

Create realistic demo fashion content.

Include:

diverse outfits

casual looks

streetwear

formal

smart casual

minimal

vintage

indie

Use high-quality fashion imagery where legally appropriate.

Do not use copyrighted brand assets without permission.

If external images are used during prototyping, structure the code so they can easily be replaced with licensed assets later.

31. EMPTY STATES

Design thoughtful empty states.

Examples:

No wardrobe items:

"Your wardrobe is waiting."

"Add your first piece and let Outfit Oasis style it."

CTA:
"Add an item"

No saved outfits:

"Nothing saved yet."

"Find a look you love and save it here."

No boards:

"Create your first style board."

32. LOADING STATES

Create polished loading states.

Examples:

AI Stylist:

"Thinking about your look..."

Scan:

"Analyzing your item..."

Wardrobe:

"Loading your wardrobe..."

Use subtle skeleton loaders and animations.

Do not create excessive spinners.

33. ERROR STATES

Create human error messages.

Examples:

"We couldn't analyze that image."

"Try another photo with better lighting."

"Something went wrong. Please try again."

Never show raw database/API errors to users.

34. MICROINTERACTIONS

Use subtle animations.

Examples:

save/favorite animation

card hover

button press

page transitions

image loading

AI response appearing

wardrobe item added

board save confirmation

Do not over-animate.

Fashion should feel calm and premium.

35. ACCESSIBILITY

Support:

keyboard navigation

readable contrast

semantic HTML

accessible buttons

accessible form labels

alt text

focus states

Do not rely solely on color to communicate status.

36. RESPONSIVE DESIGN DETAILS

Mobile:

bottom navigation

large touch targets

single-column primary flows

swipeable horizontal sections

full-width CTA buttons

Tablet:

adaptive grids

two-column content where appropriate

Desktop:

sidebar navigation

multi-column fashion grids

larger editorial imagery

centered content max-width

Avoid awkward stretched mobile cards on desktop.

37. COMPONENT SYSTEM

Create reusable components.

Examples:

Button
IconButton
Input
Select
SearchBar
Avatar
BottomNavigation
Sidebar
OutfitCard
ProductCard
WardrobeItemCard
BoardCard
StyleChip
CategoryChip
AIMessage
AIQuickAction
ImageUploader
ScanResult
OutfitBuilder
Modal
Drawer
Toast
Skeleton
EmptyState
ErrorState

Do not duplicate UI unnecessarily.

38. UI RULES

Primary buttons should have consistent styling.

Secondary actions should not visually compete with primary actions.

Do not use giant text everywhere.

Do not use excessive rounded rectangles.

Do not make every section look like a SaaS dashboard.

Fashion imagery should be the visual hero.

Typography should create hierarchy.

Use spacing intentionally.

Keep the interface uncluttered.

39. HOME UX PRIORITY

The Home screen should prioritize:

AI stylist

Today's outfit

Wardrobe

Personalized discovery

Scan

Do not make shopping the dominant element.

40. DISCOVERY UX PRIORITY

Discovery should prioritize:

inspiration

personalization

saving

outfit exploration

shopping

41. WARDROBE UX PRIORITY

Wardrobe should prioritize:

seeing what you own

adding clothes

styling clothes

creating outfits

finding missing pieces

42. AI UX PRIORITY

AI should prioritize:

understanding the user's context

recommending outfits

explaining recommendations

allowing refinement

using the user's wardrobe

Avoid generic AI responses.

For example:

BAD:

"Here is a stylish outfit for you."

GOOD:

"Since you like minimal style and you're dressing for a casual university day, try your black oversized T-shirt with your beige trousers and white sneakers."

43. CULTURAL PERSONALIZATION

Outfit Oasis is intended for Southeast Asia first.

Do not stereotype users.

Create flexible preferences for:

occasion

cultural context

dress-code requirements

modesty preferences

weather

personal comfort

These should be optional user preferences.

Do not assume a user's religion, culture, body type, or identity.

44. FUTURE FEATURES

Architect the application so these can be added later, but DO NOT attempt to fully build them in the initial MVP unless the necessary APIs are configured:

advanced computer vision

AR try-on

AI stylist avatar

body measurement

weather API integration

personalized fashion ranking model

social following

comments

creator profiles

brand dashboards

advanced affiliate tracking

recommendation ML model

push notifications

mobile native apps

Create sensible abstractions for future integration.

45. MVP PRIORITY

The first functional version must prioritize:

P0:

Authentication
User profile
Onboarding
Home
Wardrobe
Add clothing
Outfit creation
Basic AI stylist experience
Discover
Save outfits
Boards
Profile

P1:

Scan UX
Marketplace
Products
Brands
Outfit Oasis+ UI
Affiliate architecture

P2:

Real computer vision
Real LLM recommendation engine
AR
Social network
Advanced ML
Payments
Native mobile app

46. IMPORTANT: DO NOT OVERBUILD

Do not attempt to build every future feature as a fake working feature.

If an integration does not exist:

create the UI

create the correct service abstraction

create realistic demo data

clearly separate mock logic from production logic

leave a clean integration point

The application should remain functional.

47. SAMPLE USER JOURNEY

A new user:

Opens Outfit Oasis

Sees premium welcome screen

Creates account

Completes style preferences

Arrives at Home

Sees personalized Daily Edit

Opens AI Stylist

Says "I need something casual for university"

AI recommends an outfit

User saves it

User scans a black T-shirt

T-shirt is added to wardrobe

User asks AI to style it

AI produces three outfits

User saves one

User discovers similar outfits

User clicks Shop This Look

User sees relevant products

User returns to wardrobe

User creates a personal board

The application should make this journey feel natural.

48. SAMPLE SECOND JOURNEY

Existing user:

Home

↓

"Style something I own"

↓

Select black T-shirt

↓

AI Stylist

↓

"Here are 3 ways to wear it."

↓

Casual
Streetwear
Smart Casual

↓

User selects Streetwear

↓

Outfit Detail

↓

User is missing cargo pants

↓

"Find something similar"

↓

Marketplace

↓

Product

↓

Shop

This is the core STYLE → DISCOVER → SHOP loop.

49. SAMPLE THIRD JOURNEY

Discover

↓

User sees outfit

↓

Save

↓

Add to board

↓

"Shop this look"

↓

See individual products

↓

Return to Discover

This is the INSPIRE → SAVE → SHOP loop.

50. PRODUCT LANGUAGE

Use natural, human copy.

Avoid robotic phrases such as:

"Welcome to your personalized fashion optimization dashboard."

Instead:

"Let's find your look."

"What's the occasion?"

"Style something you already own."

"Try another look."

"Save this outfit."

"Shop the pieces."

"Your wardrobe is waiting."

51. IMPORTANT BRAND MESSAGE

Outfit Oasis should communicate:

"Fashion shouldn't feel complicated."

The product should reduce decision fatigue.

The user should feel:

"I know what to wear."

"I know how to style what I own."

"I found something I like."

"I can buy the missing piece."

52. FINAL DEVELOPMENT REQUIREMENT

Before considering the initial implementation complete:

test every route

test authentication

test navigation

test forms

test image upload

test wardrobe creation

test outfit creation

test save functionality

test board functionality

test responsive layouts

test empty states

test loading states

test error states

check console errors

check broken links

check mobile layout

check desktop layout

Do not leave obvious broken buttons.

If a button represents a future integration that is not yet implemented, give the user an appropriate message rather than doing nothing.

53. FIRST IMPLEMENTATION ORDER

Do NOT attempt to build everything simultaneously.

Build in this order:

STEP 1
Project foundation + design system

STEP 2
Supabase connection + authentication

STEP 3
Onboarding + profile

STEP 4
Main navigation

STEP 5
Home

STEP 6
Wardrobe

STEP 7
Outfit Builder

STEP 8
AI Stylist interface

STEP 9
Discover

STEP 10
Boards + saved outfits

STEP 11
Scan/upload workflow

STEP 12
Marketplace

STEP 13
Outfit Oasis+

STEP 14
Polish + responsive QA

At each stage, preserve existing functionality.

54. FINAL INSTRUCTION TO LOVABLE

You are not creating a generic AI fashion dashboard.

You are building a consumer fashion product.

Prioritize:

BEAUTIFUL
USEFUL
FAST
SIMPLE
PERSONAL
VISUAL
MOBILE-FIRST

The application should feel like a startup that could eventually be launched publicly.

Do not use placeholder-looking UI when a realistic component can be created.

Do not generate unnecessary features.

Do not make every screen identical.

Do not prioritize technical complexity over user experience.

Build the foundation carefully so future AI, computer vision, AR, marketplace, affiliate, and subscription integrations can be added without rewriting the entire application.

Start with the foundation, design system, authentication, onboarding, navigation, and Home experience.

Then continue through the implementation order above.

The final product should be called:

Outfit Oasis

Tagline:

LEVEL UP YOUR FASHION GAME

Core promise:

Your personal AI stylist, powered by your wardrobe.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2e817979-273e-4aaf-b91b-91274eddaf93).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

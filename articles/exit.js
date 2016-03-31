module.exports = {
  "title": "Exit",
  "date": "23 February 2016",
  "content":
    `
     <p>
        An experiment in SEO is what I like to call it.
        I first started working on my new project in December of 2015 because I wanted to learn how to use SQL properly.
        Very rarely had I actually used a database in one of my projects up until this one.
        I usually stuck to using CSV files, and regular text files to store small amounts of persistent data.
        It was dirty, but it didn't need to be production-level secure.
      </p>
      <p>
        So, I started off on my quest to learn how to use databases effectively.
        First, upon learning how to insert data into a database, I began to scrape pastes off of Pastebin and put them into my new database.
        The data started pouring in, and I watched it all happen from my terminal.
        After a few hours of this, it was evident that I would be pulling in around 70 GB a day of data; an obscene amount.
        So, I wrote a few filters to keep the data to a minimum and only parse pastes which I deemed to be "interesting."
      </p>
      <p>
        A few hours of refining and I was watching my database slowly grow.
        However, I was determined to complete the whole package in the form of a website I could use to visualize my newly-found data.
        First, I wrote a page using which would display a specified paste for viewing.
        Through this, I learned to extract and display data from a database.
        I stored and produced metadata for viewing, as well as the content of the paste itself.
        Then, over the next few weeks, I created pages for searching through recent pastes on Pastebin, and for searching through the content of my own site.
        Being a graphic designer I had to create a clean logo for the site as well, it just didn't feel right without one.
      </p>
      <p>
        I learned a lot about data manipulation, and how to read, write, and modify databases through this project of mine.
        However, I also had to learn how to do things like sanitize my inputs, convert UNIX timestamps, and a variety of other things.
      </p>
      <p>
        Up until a few weeks after I had started the site, I hadn't shared it with anyone except a few select friends.
        I watched my little slice of data as it spit out new and exciting things for me.
        Then one day, when I was checking through some settings on CloudFlare, I started to see my unique visitors spiking up.
        Even google had payed a visit to my front page.
        This was very odd because I hadn't put the link anywhere, nor had I submitted my site to Google or any other service.
        I didn't make any effort to investigate, and continued to improve on my system, which was, at the time, sitting on a small, development server.
      </p>
      <p>
        After another two or so weeks, my website dashboard displayed the last 15 pieces of text that had been archived by my algorithm.
        Google had taken advantage of this, and had started to index multiple links from my page.
        Over the next few days, I watched my site explode.
        Google was crawling hundreds of pages a day, and my visitors started to pick up very quickly.
        Figuring CloudFlare's simplistic statistics were not enough, I quickly added my site to Google Analytics, and additionally confirmed my property on Google's Search Console.
      </p>
      <p>
        I watched my unique visitors surge from 10 per day to over 1.7 thousand per day.
        I got shares on Facebook, Twitter, and even Google Plus.
        Google was my main driver of traffic, it had indexed hundreds of pages.
        I decided to up the ante and create a static index which was generated every hour to display every link on my website.
        I also used mod_rewrite to standardize URLs, added SSL, and created dynamic titles which changed based on the content of the link.
        Immediately after I did this, my SEO exploded and Google began to index thousands of pages by the day.
        Stared at the steep line representing over twenty thousand clicks from Google.
        It was a surreal experience.
        I had cultivated this website into an SEO beast in the short span of a few days, without submitting it to a single search engine or buying advertisements.
      </p>
      <p>
        For about a week I woke up early every morning in anticipation, poured a steaming cup of coffee, and hopped on to check my analytics.
        However, with great traffic came great problems.
        This "SEO experiment" was first began to bug me when I decided to add a contact email at the bottom of each page.
        The first of many emails that I would receive in the coming weeks simply said "I wanna see it".
      </p>
      <p>
        Next came another, stating "Contains information about me and damages my privacy."
        And the next day, a message offering me ten dollars to remove a certain bit of information from my website.
        After that, I weighed my options, and decided to create a custom report system which would send me email alerts every time a report was filed.
        In addition, each report contained a contact email address, name, an IP address, and the reason for the request.
        As Google remained adamant about indexing every single one of my pages, my traffic skyrocketed, and so did the volume of reports.
      </p>
      <p>
        I transitioned from a proud father watching his baby project develop into a beautiful machine into a secretary; responding to and handling twenty reports a day.
        It was growing tiresome, but I wanted to avoid and problems that the content would inevitably generate by giving users a small slice of assurance that their conflicts would be handled.
        As it turned out, my algorithm was, to put it nicely, ferverously indexing content that was highly "problematic" to some people.
      </p>
      <p>
        After a week and a half of reading and reading mail, making small improvements, closing security gaps, and analysing traffic, the reports started to ramp up faster than ever.
        I was getting daily threats about lawsuits, police, and various other federal entities.
        For my own security, I moved my database to an offshore server, but my main server retained the web serving capabilities.
        This way, my data would be protected even if my central server was somehow compromised.
      </p>
      <p>
        However, this sudden switch proved more difficult than I expected.
        After I navigated my way around the treacherous seas of opening an SQL server to the outside world, and attempting to secure it, I ran some tests and instantly noticed a difference from a local server.
        Pages were <em>very</em> slow to load, and some pages refused to load at all.
        I investigated, adding some missing SQL connection closes, and optimizing tables.
        However, the simple fact was that my new database was pinging far too slowly.
        So, my solution was to shift a larger portion of the site's workload to the backend server.
        I dynamically generated each page by a time based on the amount of queries each page required.
        This significantly reduced load times, and allowed me to serve pre-built static pages which were regenerated when necessary, while being able to retain all of my SEO optimizations.
      </p>
      <p>
        In three days, my site was optimized again.
        Finally, a machine that could run itself, all I had to do was handle the bundles of email arriving in my inbox every day.
        Except, one morning, I received a peculiar email that was not from my internal reports system, rather, the sender had obtained the old email I had used on my site weeks ago.
        As I clicked onto the message, a shiver ran through my spine.
        "Pastebin.com Support" the sender's name read.
        The subject read "Stolen Content From Pastebin.com."
        Inside was a curt message which implied a sort of informal cease and desist order.
      </p>
      <p>
        I was taken aback.
        I had used Pastebin for years, surely the German I had read about on many occasions who ran the site had not written me personally.
        Surely I had not caused the trouble and the stirring at Pastebin that this email had described.
        My first instinct was to check the message headers to determine if this was some sort of cruel joke.
        However, all of the proper signatures were in place, although I did notice that the mail was being sent on behalf of an ominous Gmail address.
        He must use Google Apps for Business, I thought to myself.
      </p>
      <p>
        Contemplating my next action, I weighed my options.
        I respected Pastebin, I had a Pro account, and I had used the site faithfully for many years.
        The email had briefly mentioned that Pastebin was already taking action against my site, seeking to find the IP of my scraping server.
        I knew they wouldn't find it.
        Even if CloudFlare gave up my server, it wouldn't be the one doing the scraping.
        However, I was a college student; I didn't have the time, nor the money to fight this.
        So, the next day, I made a full backup of the server and the database.
        I also emailed Jeroen from Pastebin back telling him that I had complied and wished to cause no further trouble.
      </p>
      <p>
        I removed the site's configuration file from my server, effectively making it's URL go to the default landing page that I have set up for all of the domains that I do not use currently.
        This page is a simple one, consisting of a small animation near the middle that I had found, with my email at the bottom.
        The page lists all of my unused domains as "for sale," so that anyone can contact me about purchasing them.
        A day or so later, what do you know?
        Another email from Jeroen, this time it was inquiring my project being up for sale.
        I told him that I was looking for offers, but that if none were satisfactory, I would be very adamant about open sourcing my work.
        He didn't like that at all, saying that he and his legal team could easily have any of my code removed from the internet.
        His intentions seemed to be to keep something like what I had dome from becoming easily reproducible, so he made me an offer.
        After some haggling, in which I made it clear that I would not let him intimidate me into handing over the files, we finally reached a satisfactory deal.
        I was still pissed off that he had tried to make me think he could control my open-source code, but in the end, the offer was a good one.
        I handed over the domain and the assets, and I received a payment from the official Pastebin PayPal.
      </p>
      <p>
        Reflecting on my experience, it was a positive one for sure.
        I got to talk directly to a real internet entrepreneur, a man behind something that was very near and dear to me, not to mention something that was quite substantial and influential on the internet (that thing being Pastebin).
        In the end I felt honored to have negotiated a deal with this man, personal contact information and all.
        I will always remember this transaction as my first exit, and a very successful one at that.
      </p>
    `
};
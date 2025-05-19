// मेन्यू टॉगल बटन और मेन्यू एलिमेंट्स प्राप्त करें - Prefixed variable names
const bcm_menuToggle = document.querySelector('.bcm-menu-toggle');
const bcm_categoriesMenu = document.querySelector('.bcm-menu-categories');
const bcm_linksMenu = document.querySelector('.bcm-menu-links');
const bcm_linksTitle = bcm_linksMenu.querySelector('.bcm-links-title');
const bcm_categoryTitleElement = bcm_categoriesMenu.querySelector('.bcm-category-title');

// सभी कैटेगरी एलिमेंट्स प्राप्त करें - Prefixed variable name
const bcm_categories = document.querySelectorAll('.bcm-category');

// सभी लिंक्स कंटेंट एलिमेंट्स प्राप्त करें - Prefixed variable name
const bcm_linksContent = document.querySelectorAll('.bcm-links-content .bcm-links'); // Prefixed class names

// आइकन मैपिंग - Prefixed keys
const bcm_categoryIcons = {
    'bcm-class-1-5': '<i class="fas fa-book-reader"></i>', 'bcm-class-6-8': '<i class="fas fa-graduation-cap"></i>',
    'bcm-class-9-10': '<i class="fas fa-school"></i>', 'bcm-class-11-12': '<i class="fas fa-university"></i>',
    'bcm-competitive-exam': '<i class="fas fa-trophy"></i>', 'bcm-news-channel': '<i class="fas fa-newspaper"></i>',
    'bcm-yoga-ayurveda': '<i class="fas fa-heart"></i>', 'bcm-marriage-links': '<i class="fas fa-ring"></i>',
    'bcm-editorial-links': '<i class="fas fa-edit"></i>', 'bcm-government-links': '<i class="fas fa-flag"></i>',
    'bcm-astrology-links': '<i class="fas fa-star"></i>', 'bcm-vaidik-links': '<i class="fas fa-om"></i>'
};

// Gradient classes (Titles और Title Borders के लिए) - Prefixed classes
const bcm_gradientClasses = [
    'bcm-gradient-1', 'bcm-gradient-2', 'bcm-gradient-3', 'bcm-gradient-4', 'bcm-gradient-5', 'bcm-gradient-6',
    'bcm-gradient-7', 'bcm-gradient-8', 'bcm-gradient-9', 'bcm-gradient-10', 'bcm-gradient-11', 'bcm-gradient-12'
];

// Function to remove all gradient classes - Prefixed function name
function bcm_removeGradientClasses(element) {
     bcm_gradientClasses.forEach(cls => element.classList.remove(cls));
 }

// मेन्यू टॉगल बटन पर क्लिक इवेंट जोड़ें (कैटेगरी टाइटल के लिए रैंडम ग्रेडिएंट)
bcm_menuToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // इवेंट को ऊपर जाने से रोकें
    const bcm_isActive = bcm_categoriesMenu.classList.contains('bcm-active'); // Prefixed class

    if (bcm_isActive) {
        bcm_categoriesMenu.classList.remove('bcm-active'); // Prefixed class
        bcm_linksMenu.classList.remove('bcm-show'); // लिंक्स मेन्यू भी बंद करें - Prefixed class
        bcm_categoryTitleElement.style.display = 'none'; // कैटेगरी टाइटल छिपाएं
    } else {
         bcm_linksMenu.classList.remove('bcm-show'); // पहले लिंक्स मेन्यू बंद करें - Prefixed class
         bcm_categoriesMenu.classList.add('bcm-active'); // Prefixed class
         bcm_categoryTitleElement.style.display = 'block'; // कैटेगरी टाइटल दिखाएं
         // कैटेगरी टाइटल के लिए रैंडम ग्रेडिएंट लागू करें
         bcm_removeGradientClasses(bcm_categoryTitleElement); // Prefixed function call
         const randomGradientIndex = Math.floor(Math.random() * bcm_gradientClasses.length); // Prefixed array name
         bcm_categoryTitleElement.classList.add(bcm_gradientClasses[randomGradientIndex]); // Prefixed array name
         bcm_categoryTitleElement.innerHTML = '<i class="fas fa-hand-point-down"></i> अपनी पसंद पर क्लिक करें'; // सुनिश्चित करें कि टेक्स्ट सही है
    }
});

 // हर कैटेगरी के लिए क्लिक इवेंट जोड़ें
 bcm_categories.forEach((category, index) => { // Using prefixed variable name
     category.addEventListener('click', (event) => {
         event.stopPropagation(); // इवेंट को ऊपर जाने से रोकें

         const bcm_categoryData = category.getAttribute('data-bcm-category'); // Prefixed data attribute
         const bcm_titleText = category.getAttribute('data-bcm-title'); // Prefixed data attribute
         const bcm_iconHtml = bcm_categoryIcons[bcm_categoryData] || '<i class="fas fa-link"></i>'; // Using prefixed map and data

         // सभी लिंक्स सेक्शन छिपाएं - Using prefixed variable name
         bcm_linksContent.forEach(linkBox => {
             linkBox.style.display = 'none';
         });

         // सही लिंक्स सेक्शन दिखाएं - Using prefixed selector
         const bcm_targetLinks = bcm_linksMenu.querySelector(`.bcm-links-content .${bcm_categoryData}`); // Prefixed selector
         if (bcm_targetLinks) {
             bcm_targetLinks.style.display = 'block';
         } else {
             console.warn(`Links section for category '${bcm_categoryData}' not found.`); // चेतावनी अगर सेक्शन नहीं मिलता है
         }

         // लिंक्स टाइटल अपडेट करें - Using prefixed variable name
         bcm_linksTitle.innerHTML = `${bcm_iconHtml} ${bcm_titleText}`;

         // लिंक्स टाइटल पर स्पेसिफिक ग्रेडिएंट बॉर्डर लागू करें - Using prefixed variable and function
         bcm_removeGradientClasses(bcm_linksTitle); // Prefixed function call
         bcm_linksTitle.classList.add(bcm_gradientClasses[index % bcm_gradientClasses.length]); // Prefixed array name

         // कैटेगरी मेन्यू छिपाएं और लिंक्स मेन्यू दिखाएं - Using prefixed variables and classes
         bcm_categoriesMenu.classList.remove('bcm-active'); // Prefixed class
         bcm_linksMenu.classList.add('bcm-show'); // Prefixed class
         bcm_categoryTitleElement.style.display = 'none'; // कैटेगरी टाइटल छिपाएं जब लिंक्स खुलें
     });
 });


// डॉक्यूमेंट पर कहीं और क्लिक होने पर मेन्यू छिपाने के लिए इवेंट जोड़ें
document.addEventListener('click', (event) => {
    // जाँचें कि क्लिक मेन्यू टॉगल, कैटेगरी मेन्यू या लिंक्स मेन्यू के अंदर नहीं हुआ है - Using prefixed variables
    if (
        !bcm_menuToggle.contains(event.target) &&
        !bcm_categoriesMenu.contains(event.target) &&
        !bcm_linksMenu.contains(event.target)
    ) {
        bcm_categoriesMenu.classList.remove('bcm-active'); // Prefixed class
        bcm_linksMenu.classList.remove('bcm-show'); // Prefixed class
        // कैटेगरी टाइटल भी छिपाएं जब बाहर क्लिक हो
        if (bcm_categoryTitleElement) { // सुनिश्चित करें कि एलिमेंट मौजूद है - Using prefixed variable
             bcm_categoryTitleElement.style.display = 'none';
         }
    }
});

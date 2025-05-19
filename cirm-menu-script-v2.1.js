// मेन्यू टॉगल बटन और मेन्यू एलिमेंट्स प्राप्त करें
const menuToggle = document.querySelector('.menu-toggle');
const categoriesMenu = document.querySelector('.menu-categories');
const linksMenu = document.querySelector('.menu-links');
const linksTitle = linksMenu.querySelector('.links-title');
const categoryTitleElement = categoriesMenu.querySelector('.category-title');

// सभी कैटेगरी एलिमेंट्स प्राप्त करें
const categories = document.querySelectorAll('.category');

// सभी लिंक्स कंटेंट एलिमेंट्स प्राप्त करें
const linksContent = document.querySelectorAll('.links-content .links');

// आइकन मैッピング
const categoryIcons = {
    'class-1-5': '<i class="fas fa-book-reader"></i>', 'class-6-8': '<i class="fas fa-graduation-cap"></i>',
    'class-9-10': '<i class="fas fa-school"></i>', 'class-11-12': '<i class="fas fa-university"></i>',
    'competitive-exam': '<i class="fas fa-trophy"></i>', 'news-channel': '<i class="fas fa-newspaper"></i>',
    'yoga-ayurveda': '<i class="fas fa-heart"></i>', 'marriage-links': '<i class="fas fa-ring"></i>',
    'editorial-links': '<i class="fas fa-edit"></i>', 'government-links': '<i class="fas fa-flag"></i>',
    'astrology-links': '<i class="fas fa-star"></i>', 'vaidik-links': '<i class="fas fa-om"></i>'
};

// Gradient classes (Titles और Title Borders के लिए)
const gradientClasses = [
    'gradient-1', 'gradient-2', 'gradient-3', 'gradient-4', 'gradient-5', 'gradient-6',
    'gradient-7', 'gradient-8', 'gradient-9', 'gradient-10', 'gradient-11', 'gradient-12'
];

// Function to remove all gradient classes
function removeGradientClasses(element) {
     gradientClasses.forEach(cls => element.classList.remove(cls));
 }

// मेन्यू टॉगल बटन पर क्लिक इवेंट जोड़ें (कैटेगरी टाइटल के लिए रैंडम ग्रेडिएंट)
menuToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // इवेंट को ऊपर जाने से रोकें
    const isActive = categoriesMenu.classList.contains('active');

    if (isActive) {
        categoriesMenu.classList.remove('active');
        linksMenu.classList.remove('show'); // लिंक्स मेन्यू भी बंद करें
        categoryTitleElement.style.display = 'none'; // कैटेगरी टाइटल छिपाएं
    } else {
         linksMenu.classList.remove('show'); // पहले लिंक्स मेन्यू बंद करें
         categoriesMenu.classList.add('active');
         categoryTitleElement.style.display = 'block'; // कैटेगरी टाइटल दिखाएं
         // कैटेगरी टाइटल के लिए रैंडम ग्रेडिएंट लागू करें
         removeGradientClasses(categoryTitleElement);
         const randomGradientIndex = Math.floor(Math.random() * gradientClasses.length);
         categoryTitleElement.classList.add(gradientClasses[randomGradientIndex]);
         categoryTitleElement.innerHTML = '<i class="fas fa-hand-point-down"></i> अपनी पसंद पर क्लिक करें'; // सुनिश्चित करें कि टेक्स्ट सही है
    }
});

 // हर कैटेगरी के लिए क्लिक इवेंट जोड़ें
 categories.forEach((category, index) => {
     category.addEventListener('click', (event) => {
         event.stopPropagation(); // इवेंट को ऊपर जाने से रोकें

         const categoryData = category.getAttribute('data-category');
         const titleText = category.getAttribute('data-title');
         const iconHtml = categoryIcons[categoryData] || '<i class="fas fa-link"></i>';

         // सभी लिंक्स सेक्शन छिपाएं
         linksContent.forEach(linkBox => {
             linkBox.style.display = 'none';
         });

         // सही लिंक्स सेक्शन दिखाएं
         const targetLinks = linksMenu.querySelector(`.links-content .${categoryData}`);
         if (targetLinks) {
             targetLinks.style.display = 'block';
         } else {
             console.warn(`Links section for category '${categoryData}' not found.`); // चेतावनी अगर सेक्शन नहीं मिलता है
         }

         // लिंक्स टाइटल अपडेट करें
         linksTitle.innerHTML = `${iconHtml} ${titleText}`;

         // लिंक्स टाइटल पर स्पेसिफिक ग्रेडिएंट बॉर्डर लागू करें
         removeGradientClasses(linksTitle); // पहले पुरानी क्लास हटाएं
         linksTitle.classList.add(gradientClasses[index % gradientClasses.length]); // नई क्लास जोड़ें

         // कैटेगरी मेन्यू छिपाएं और लिंक्स मेन्यू दिखाएं
         categoriesMenu.classList.remove('active');
         linksMenu.classList.add('show');
         categoryTitleElement.style.display = 'none'; // कैटेगरी टाइटल छिपाएं जब लिंक्स खुलें
     });
 });


// डॉक्यूमेंट पर कहीं और क्लिक होने पर मेन्यू छिपाने के लिए इवेंट जोड़ें
document.addEventListener('click', (event) => {
    // जाँचें कि क्लिक मेन्यू टॉगल, कैटेगरी मेन्यू या लिंक्स मेन्यू के अंदर नहीं हुआ है
    if (
        !menuToggle.contains(event.target) &&
        !categoriesMenu.contains(event.target) &&
        !linksMenu.contains(event.target)
    ) {
        categoriesMenu.classList.remove('active');
        linksMenu.classList.remove('show');
        // कैटेगरी टाइटल भी छिपाएं जब बाहर क्लिक हो
        if (categoryTitleElement) { // सुनिश्चित करें कि एलिमेंट मौजूद है
             categoryTitleElement.style.display = 'none';
         }
    }
});

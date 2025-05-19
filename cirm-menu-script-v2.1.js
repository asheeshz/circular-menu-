document.addEventListener('DOMContentLoaded', function() {
    // मेन्यू टॉगल बटन और मेन्यू एलिमेंट्स प्राप्त करें
    const menuToggle = document.querySelector('.cm__menu-toggle');
    const categoriesMenu = document.querySelector('.cm__menu-categories');
    const linksMenu = document.querySelector('.cm__menu-links');
    const linksTitle = linksMenu.querySelector('.cm__links-title');
    const categoryTitleElement = categoriesMenu.querySelector('.cm__category-title');

    // सभी कैटेगरी एलिमेंट्स प्राप्त करें
    const categories = document.querySelectorAll('.cm__category');

    // सभी लिंक्स कंटेंट एलिमेंट्स प्राप्त करें
    const linksContent = document.querySelectorAll('.cm__links-content .cm__links');

    // आइकन मैपिंग (data-category values are prefixed)
    const categoryIcons = {
        'cm__class-1-5': '<i class="fas fa-book-reader"></i>', 'cm__class-6-8': '<i class="fas fa-graduation-cap"></i>',
        'cm__class-9-10': '<i class="fas fa-school"></i>', 'cm__class-11-12': '<i class="fas fa-university"></i>',
        'cm__competitive-exam': '<i class="fas fa-trophy"></i>', 'cm__news-channel': '<i class="fas fa-newspaper"></i>',
        'cm__yoga-ayurveda': '<i class="fas fa-heart"></i>', 'cm__marriage-links': '<i class="fas fa-ring"></i>',
        'cm__editorial-links': '<i class="fas fa-edit"></i>', 'cm__government-links': '<i class="fas fa-flag"></i>',
        'cm__astrology-links': '<i class="fas fa-star"></i>', 'cm__vaidik-links': '<i class="fas fa-om"></i>'
    };

    // Gradient classes (prefixed)
    const gradientClasses = [
        'cm__gradient-1', 'cm__gradient-2', 'cm__gradient-3', 'cm__gradient-4', 'cm__gradient-5', 'cm__gradient-6',
        'cm__gradient-7', 'cm__gradient-8', 'cm__gradient-9', 'cm__gradient-10', 'cm__gradient-11', 'cm__gradient-12'
    ];

    function removeGradientClasses(element) {
         gradientClasses.forEach(cls => element.classList.remove(cls));
     }

    if (menuToggle) { // Check if elements exist before adding listeners
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const isActive = categoriesMenu.classList.contains('cm__active');

            if (isActive) {
                categoriesMenu.classList.remove('cm__active');
                linksMenu.classList.remove('cm__show');
                if(categoryTitleElement) categoryTitleElement.style.display = 'none';
            } else {
                 linksMenu.classList.remove('cm__show');
                 categoriesMenu.classList.add('cm__active');
                 if(categoryTitleElement) {
                    categoryTitleElement.style.display = 'block';
                    removeGradientClasses(categoryTitleElement);
                    const randomGradientIndex = Math.floor(Math.random() * gradientClasses.length);
                    categoryTitleElement.classList.add(gradientClasses[randomGradientIndex]);
                    categoryTitleElement.innerHTML = '<i class="fas fa-hand-point-down"></i> अपनी पसंद पर क्लिक करें';
                 }
            }
        });
    }

     categories.forEach((category, index) => {
         category.addEventListener('click', (event) => {
             event.stopPropagation();

             const categoryData = category.getAttribute('data-category'); // e.g., "cm__class-1-5"
             const titleText = category.getAttribute('data-title');
             const iconHtml = categoryIcons[categoryData] || '<i class="fas fa-link"></i>';

             linksContent.forEach(linkBox => {
                 linkBox.style.display = 'none';
             });
             
             // categoryData is already prefixed, e.g., "cm__class-1-5"
             const targetLinks = linksMenu.querySelector(`.cm__links-content .${categoryData}`);
             if (targetLinks) {
                 targetLinks.style.display = 'block';
             } else {
                 console.warn(`Links section for category '${categoryData}' not found.`);
             }

             if(linksTitle) {
                linksTitle.innerHTML = `${iconHtml} ${titleText}`;
                removeGradientClasses(linksTitle);
                linksTitle.classList.add(gradientClasses[index % gradientClasses.length]);
             }
             
             if(categoriesMenu) categoriesMenu.classList.remove('cm__active');
             if(linksMenu) linksMenu.classList.add('cm__show');
             if(categoryTitleElement) categoryTitleElement.style.display = 'none';
         });
     });

    document.addEventListener('click', (event) => {
        if (menuToggle && categoriesMenu && linksMenu &&
            !menuToggle.contains(event.target) &&
            !categoriesMenu.contains(event.target) &&
            !linksMenu.contains(event.target)
        ) {
            categoriesMenu.classList.remove('cm__active');
            linksMenu.classList.remove('cm__show');
            if (categoryTitleElement) {
                 categoryTitleElement.style.display = 'none';
             }
        }
    });
});

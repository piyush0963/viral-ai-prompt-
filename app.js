const prompts = [
    {
        id: 1,
        title: "Senior Developer Code Review",
        category: "coding",
        text: "Act as an expert software engineer with 15 years of experience. Review the following code snippet. Focus on performance optimization, security vulnerabilities, edge cases, and adherence to clean code principles. Provide a refactored version of the code and explain the 'why' behind each change.\n\n[INSERT CODE HERE]"
    },
    {
        id: 2,
        title: "Viral Twitter Thread Hook",
        category: "marketing",
        text: "I need to write a viral Twitter thread about [TOPIC]. Generate 5 highly engaging, scroll-stopping hooks for the first tweet. Use psychological triggers like curiosity, contrarian thinking, or impressive numbers. The tone should be authoritative but accessible."
    },
    {
        id: 3,
        title: "The Feynman Technique Explainer",
        category: "productivity",
        text: "Explain the concept of [COMPLEX TOPIC] to me using the Feynman Technique. Break it down so simply that a 12-year-old could understand it. Use an everyday analogy to illustrate the core mechanism, and avoid any technical jargon unless you immediately define it."
    },
    {
        id: 4,
        title: "SEO-Optimized Blog Post Outline",
        category: "writing",
        text: "Create a comprehensive, SEO-optimized blog post outline for the keyword '[KEYWORD]'. Include a catchy H1 title, 5-7 H2 subheadings, and bullet points under each subheading detailing what to cover. Suggest 3 internal link concepts and a strong call-to-action for the conclusion."
    },
    {
        id: 5,
        title: "React Component Generator",
        category: "coding",
        text: "Write a modern React functional component for a [COMPONENT_NAME] using TailwindCSS for styling. Ensure the component is accessible (ARIA tags), fully responsive, and includes prop types. Use hooks for any internal state management. Return ONLY the code, no explanations."
    },
    {
        id: 6,
        title: "Cold Email that Converts",
        category: "marketing",
        text: "Write a short, punchy cold email to a [TARGET_PERSONA] offering [YOUR_SERVICE]. The email must be under 100 words. Start with a personalized compliment, state the value proposition clearly in one sentence, and end with a low-friction call to action asking for a quick reply, not a call."
    },
    {
        id: 7,
        title: "Viral Nanobana 3D Instagram Avatar",
        category: "image-gen",
        text: "Create a 3D realistic illustration of a 22-year-old boy/girl sitting casually on top of the Instagram logo. The character must wear casual modern clothing like sneakers and a hoodie with the name 'Nanobana' written on it. The background should be a social media profile page with a username '[YOUR_NAME]' and viral matching profile picture."
    },
    {
        id: 8,
        title: "YouTube Thumbnail Transformation",
        category: "image-gen",
        text: "Generate a high-contrast, hyper-realistic viral YouTube thumbnail image. Split screen: On the left, a normal everyday photo of a person. On the right, an epic glowing, super-powered 'Nanobana' transformation of the same person. Bold colorful text in the background saying '100 DAYS TRANSFORMATION', with neon glowing effects."
    },
    {
        id: 9,
        title: "Viral Anime Transformation (Reels)",
        category: "image-gen",
        text: "A magical realistic transition showing half of a person's face as a normal human, and the other half transforming into a glowing, aesthetic Nanobana anime character. Use deep purple and blue neon lighting, cinematic depth of field, and floating light particles to make it perfect for a viral Instagram Reel cover."
    }
];

// Elements
const promptsContainer = document.getElementById('prompts-container');
const filterBtns = document.querySelectorAll('.filter-btn');
const toast = document.getElementById('toast');

// Render Prompts
function renderPrompts(category = 'all') {
    promptsContainer.innerHTML = '';
    
    const filteredPrompts = category === 'all' 
        ? prompts 
        : prompts.filter(p => p.category === category);

    filteredPrompts.forEach(prompt => {
        const card = document.createElement('div');
        card.className = 'prompt-card';
        
        card.innerHTML = `
            <div class="card-header">
                <span class="category-tag">${prompt.category}</span>
            </div>
            <h3 class="card-title">${prompt.title}</h3>
            <div class="prompt-text-container">
                <p class="prompt-text">${prompt.text.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="card-actions">
                <button class="btn btn-copy" onclick="copyPrompt(this, \`${prompt.text.replace(/`/g, '\\`')}\`)">
                    <i class="fa-regular fa-copy"></i> Copy
                </button>
                <button class="btn btn-launch chatgpt-btn" onclick="launchAI(\`${prompt.text.replace(/`/g, '\\`')}\`, 'chatgpt')">
                    ChatGPT
                </button>
                <button class="btn btn-launch gemini-btn" onclick="launchAI(\`${prompt.text.replace(/`/g, '\\`')}\`, 'gemini')">
                    Gemini
                </button>
            </div>
        `;
        
        promptsContainer.appendChild(card);
    });
}

// Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Render filtered
        renderPrompts(btn.dataset.category);
    });
});

// Copy Functionality
async function copyPrompt(buttonElement, text) {
    try {
        await navigator.clipboard.writeText(text);
        
        // Button UI Feedback
        const originalHtml = buttonElement.innerHTML;
        buttonElement.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        buttonElement.classList.add('success');
        
        // Show Toast
        showToast();

        setTimeout(() => {
            buttonElement.innerHTML = originalHtml;
            buttonElement.classList.remove('success');
        }, 2000);

    } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy to clipboard.');
    }
}

// Launch AI Functionality
function launchAI(text, aiType) {
    // Copy the text to clipboard automatically so it's ready to paste
    navigator.clipboard.writeText(text).then(() => {
        let url = '';
        if (aiType === 'chatgpt') {
            showToast("Copied & Opening ChatGPT...");
            url = 'https://chatgpt.com';
        } else if (aiType === 'gemini') {
            showToast("Copied & Opening Gemini...");
            url = 'https://gemini.google.com';
        }
        
        // Open the selected AI in a new tab/app
        setTimeout(() => {
            window.open(url, '_blank');
        }, 800);
    });
}

// Toast Notification
function showToast(message = "Prompt copied to clipboard!") {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize
renderPrompts();

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.error('ServiceWorker registration failed: ', err);
            });
    });
}

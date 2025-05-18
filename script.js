// script.js

document.getElementById('intakeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading spinner
    document.getElementById('loading').style.display = 'block';
    document.getElementById('responseContainer').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        businessChallenge: document.getElementById('challenge').value,
        industry: document.getElementById('industry').value,
        toolsUsed: document.getElementById('tools').value
    };
    
    // Simulate API call (in a real implementation, this would call a Claude API endpoint)
    simulateAIResponse(formData)
        .then(displayResponse)
        .catch(handleError);
});

// This function simulates what would normally be an API call to Claude
function simulateAIResponse(formData) {
    return new Promise((resolve, reject) => {
        // In a real implementation, this would be an API call
        setTimeout(() => {
            try {
                // Generate response based on input
                const response = generateMockResponse(formData);
                resolve(response);
                
                // In a real app, you would also store this data
                storeDataInMemory(formData, response);
            } catch (error) {
                reject(error);
            }
        }, 2000); // Simulate API delay
    });
}

// This generates a response based on the input data
// In a real implementation, this would be replaced by the Claude API response
function generateMockResponse(formData) {
    const industry = formData.industry.toLowerCase();
    const challenge = formData.businessChallenge.toLowerCase();
    const tools = formData.toolsUsed.toLowerCase();
    
    let problemSummary = '';
    let aiSolution = '';
    
    // Simple logic to generate responses based on keywords
    if (challenge.includes('email') || challenge.includes('question') || challenge.includes('repetitive')) {
        problemSummary = `${formData.name} is spending excessive time answering repetitive questions and handling routine communications, which reduces productivity and time available for high-value tasks.`;
        
        if (industry.includes('real estate')) {
            aiSolution = "Implement a conversational AI chatbot that can handle property inquiries, showing schedules, and basic application questions. The AI can be trained on your listing details and FAQs, then integrated with your website and messaging platforms. Consider tools like Dialogflow or Rasa, which can integrate with your existing tools like " + formData.toolsUsed + ". This solution can reduce response time from hours to seconds and free up approximately 15-20 hours of your week.";
        } else {
            aiSolution = "Deploy an AI-powered customer service automation system that can handle frequently asked questions and routine inquiries across your communication channels. Using natural language processing, this solution can understand context, provide accurate responses, and only escalate complex issues to you. Integration with tools like " + formData.toolsUsed + " would provide a seamless experience while reducing your workload by up to 70%.";
        }
    }
    else if (challenge.includes('trend') || challenge.includes('data') || challenge.includes('analysis')) {
        problemSummary = `${formData.name} needs better insights from business data to make informed decisions, but lacks the time or tools to effectively analyze the information.`;
        
        if (industry.includes('retail')) {
            aiSolution = "Create an automated analytics dashboard that pulls data from your POS system and social media channels. Using AI-powered trend detection, the system can identify top-selling products, forecast inventory needs, and highlight customer sentiment from reviews and comments. This solution would integrate with " + formData.toolsUsed + " through APIs and provide daily insights without requiring manual analysis. Implementation could be achieved within 2-3 weeks using tools like Tableau or Power BI with AI extensions.";
        } else {
            aiSolution = "Implement a business intelligence system with AI-driven analytics that automatically processes data from your existing tools (" + formData.toolsUsed + "). The system would provide actionable insights through customizable dashboards, automated reports, and anomaly detection. This would eliminate the need for manual data analysis while providing deeper insights for decision-making.";
        }
    }
    else {
        // Generic response for other cases
        problemSummary = `${formData.name} is facing efficiency challenges in their ${formData.industry} business that require smarter solutions to streamline operations and improve outcomes.`;
        
        aiSolution = "Implement a customized AI workflow assistant that integrates with your current tools (" + formData.toolsUsed + ") to automate routine tasks and provide actionable insights. This solution would use a combination of process automation, natural language processing, and predictive analytics to address your specific challenges. A phased implementation approach would allow for quick wins within 30 days while building toward a comprehensive solution that could save 15+ hours weekly and improve accuracy by up to 40%.";
    }
    
    return {
        problemSummary: problemSummary,
        aiSolution: aiSolution
    };
}

// Display the response in the UI
function displayResponse(response) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('responseContainer').style.display = 'block';
    
    document.getElementById('problemSummary').textContent = response.problemSummary;
    document.getElementById('aiSolution').textContent = response.aiSolution;
}

// Handle errors
function handleError(error) {
    console.error('Error:', error);
    document.getElementById('loading').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'block';
}

// In a real application, this would store data to a database or sheet
const storedData = [];
function storeDataInMemory(formData, response) {
    const entry = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        businessChallenge: formData.businessChallenge, 
        industry: formData.industry,
        toolsUsed: formData.toolsUsed,
        problemSummary: response.problemSummary,
        aiSolution: response.aiSolution
    };
    
    storedData.push(entry);
    console.log('Data stored:', storedData);
    // In a real app, you'd send this to your backend to store in Google Sheets or a database
}

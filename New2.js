// Function to generate research content
document.getElementById('generateBtn').addEventListener('click', generateResearch);

async function generateResearch() {
  const query = document.getElementById('researchQuery').value.trim();
  
  if (!query) {
    alert("Please enter a research topic.");
    return;
  }

  // Show loading message
  document.getElementById('researchText').textContent = "Generating research content...";
  document.getElementById('referencesList').innerHTML = "<li>Fetching references...</li>";

  try {
    // Make the request to OpenAI API (replace with your API key)
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'  // Replace with your OpenAI API key
      },
      body: JSON.stringify({
        model: "text-davinci-003",  // You can adjust this to a different model if needed
        prompt: `Write a detailed research paper on the topic: "${query}". Include citations after each relevant statement, and list the references at the end with full details including the URL.`,
        max_tokens: 1500,
        temperature: 0.7,
      })
    });

    const data = await response.json();
    const researchText = data.choices[0].text.trim();

    // Display the generated text in the pre tag
    document.getElementById('researchText').textContent = researchText;

    // Sample citations (replace with actual API call to fetch real references)
    const citations = [
      {
        author: "Smith, J.",
        year: "2020",
        title: "Research on AI",
        journal: "Journal of AI Studies",
        url: "https://doi.org/xxxxxx"
      },
      {
        author: "Doe, A.",
        year: "2021",
        title: "Advances in Machine Learning",
        journal: "AI Journal",
        url: "https://doi.org/yyyyyy"
      }
    ];

    const referencesList = document.getElementById('referencesList');
    referencesList.innerHTML = ''; // Clear any previous references

    citations.forEach(citation => {
      const li = document.createElement('li');
      li.innerHTML = `${citation.author} (${citation.year}). ${citation.title}. <i>${citation.journal}</i>. <a href="${citation.url}" target="_blank">${citation.url}</a>`;
      referencesList.appendChild(li);
    });
  } catch (error) {
    console.error("Error generating research:", error);
    alert("An error occurred while generating the research. Please try again.");
  }
}

// Function to select text
function selectText() {
  const textElement = document.getElementById('researchText');
  const range = document.createRange();
  range.selectNodeContents(textElement);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

// Function to copy text
function copyText() {
  const textElement = document.getElementById('researchText');
  const range = document.createRange();
  range.selectNodeContents(textElement);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert('Text copied to clipboard!');
    } else {
      alert('Failed to copy text.');
    }
  } catch (err) {
    alert('Failed to copy text.');
  }
}

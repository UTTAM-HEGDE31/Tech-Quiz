const params = new URLSearchParams(window.location.search);
const topic = params.get("domain");
const score = parseFloat(params.get("score")) || 0;

let level = "";
if (score > 40 && score <= 70) {
  level = "Intermediate";
}
else if (score > 70) {
  level = "Advanced";
} else {
  level = "Beginner";
}   

let topics = [];
let projects = [];
let overview = "";
let res="";

getroadmap(topic, level);

async function getroadmap(folder, level) {
  try {
    const response = await fetch(`./Roadmaps/${folder}/info.json`);
    const data = await response.json();
    
    topics = data[level].Topics || [];
    projects = data[level].Projects || [];
    overview = data[level].Overview || "";
    res = data[level].res || "";  
    
    updateRoadmapUI();
  } catch (error) {
    console.error('Error fetching roadmap data:', error);
  }
}


function updateRoadmapUI() {
  // Update overview
  const overviewElement = document.getElementById("domain-description");
  if (overviewElement) {
    overviewElement.textContent = overview;
  }

  // Update topics
  const roadmapSection = document.getElementById("roadmap-steps");
  if (roadmapSection) {
    roadmapSection.innerHTML = ''; // Clear existing content
    topics.forEach((topic, index) => {
      const step = document.createElement("div");
      step.className = "roadmap-step";
      step.innerHTML = `
        <div class="step-number">${index + 1}</div>
        <div class="step-content">
          <h4>${topic}</h4>
          <p>Deep dive into ${topic} with explanations and examples.</p>
          <div class="step-tags">
            <span class="step-tag">Concept</span>
            <span class="step-tag">Practice</span>
          </div>
        </div>
      `;
      roadmapSection.appendChild(step);
    });
  }

  // Update projects
  const resourcesSection = document.getElementById("resources-container");
  if (resourcesSection) {
    resourcesSection.innerHTML = ''; // Clear existing content
    projects.forEach(project => {
      const card = document.createElement("div");
      card.className = "col-md-6";
      card.innerHTML = `
        <div class="resource-card">
          <h5>${project}</h5>
          <p>Build this project to reinforce your understanding.</p>
        </div>
      `;
      resourcesSection.appendChild(card);
    });
  }

  // Update resource link
  const resourceLink = document.getElementById("resource-link");

    resourceLink.href = `${res}`;
  

  // Update skill meter
  const progressBar = document.getElementById("skill-progress");
  const skillText = document.getElementById("skill-description");
  if (progressBar && skillText) {
    progressBar.style.width = `${score}%`;
    skillText.textContent = `Your score is ${score}%. You are classified as ${level}.`;
  }
}

// Parse URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function determineSkillLevel(score) {
    if (score < 40) return "Beginner";
    else if (score < 70) return "Intermediate";
    else return "Advanced";
}

function updateSkillMeter(score, level) {
    const progressBar = document.getElementById("skill-progress");
    const skillText = document.getElementById("skill-description");

    progressBar.style.width = `${score}%`;
    skillText.textContent = `Your score is ${score}%. You are classified as ${level}.`;
}

function createRoadmapSteps(data, level) {
    const roadmapSection = document.getElementById("roadmap-steps");
    const resourcesSection = document.getElementById("resources-container");
    const overview = data[level].Overview;
    const topics = data[level].Topics;
    const projects = data[level].Projects;

    document.getElementById("domain-description").textContent = overview;

    topics.forEach((topic, index) => {
        const step = document.createElement("div");
        step.className = "roadmap-step";

        step.innerHTML = `
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
                <h4>${topic}</h4>
                <p>Deep dive into ${topic} with explanations and examples.</p>
                <div class="step-tags">
                    <span class="step-tag">Concept</span>
                    <span class="step-tag">Practice</span>
                </div>
            </div>
        `;
        roadmapSection.appendChild(step);
    });

    projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "col-md-6";
        card.innerHTML = `
            <div class="resource-card">
                <h5>${project}</h5>
                <p>Build this project to reinforce your understanding.</p>
            </div>
        `;
        resourcesSection.appendChild(card);
    });
}

// Function to fetch roadmap data
async function fetchRoadmapData(domain) {
    try {
        const response = await fetch(`./roadmaps/${domain}/info.json`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching roadmap data:', error);
        return null;
    }
}

// Run logic on page load
window.addEventListener("DOMContentLoaded", async () => {
    const domain = getQueryParam("domain");
    const score = parseFloat(getQueryParam("score")) || 0;
    const capitalizedDomain = domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : "Data Structures";

    // Set Title
    document.getElementById("domain-title").textContent = `${capitalizedDomain} Roadmap`;

    // Get skill level
    const level = determineSkillLevel(score);

    // Update Skill Section
    updateSkillMeter(score, level);

    // Fetch and load roadmap data
    const roadmapData = await fetchRoadmapData(domain);
    if (roadmapData) {
        createRoadmapSteps(roadmapData, level);
    } else {
        console.error('Failed to load roadmap data');
    }
});

// VR Solar System Interaction
document.addEventListener('DOMContentLoaded', function() {
    // Planet information data
    const planetData = {
        sun: {
            name: "Sun",
            description: "The Sun is the star at the center of our Solar System. It's a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.",
            facts: [
                "Diameter: 1,392,684 km (about 109 times Earth)",
                "Mass: 1.989 × 10^30 kg (333,000 times Earth)",
                "Surface Temperature: 5,500°C",
                "Composition: 74.9% hydrogen, 23.8% helium"
            ]
        },
        mercury: {
            name: "Mercury",
            description: "Mercury is the smallest and innermost planet in the Solar System. It completes an orbit around the Sun every 88 days.",
            facts: [
                "Diameter: 4,879 km",
                "Distance from Sun: 57.9 million km",
                "Orbital Period: 88 Earth days",
                "Surface Temperature: -173°C to 427°C"
            ]
        },
        venus: {
            name: "Venus",
            description: "Venus is the second planet from the Sun and is similar in size and mass to Earth. It has the densest atmosphere of the terrestrial planets.",
            facts: [
                "Diameter: 12,104 km",
                "Distance from Sun: 108.2 million km",
                "Orbital Period: 225 Earth days",
                "Surface Temperature: 462°C (hottest planet)"
            ]
        },
        earth: {
            name: "Earth",
            description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29% of Earth's surface is land with the remaining 71% covered with water.",
            facts: [
                "Diameter: 12,742 km",
                "Distance from Sun: 149.6 million km",
                "Orbital Period: 365.25 days",
                "Surface Temperature: -89°C to 58°C"
            ]
        },
        mars: {
            name: "Mars",
            description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It's often referred to as the 'Red Planet' due to its reddish appearance.",
            facts: [
                "Diameter: 6,779 km",
                "Distance from Sun: 227.9 million km",
                "Orbital Period: 687 Earth days",
                "Surface Temperature: -87°C to -5°C"
            ]
        },
        jupiter: {
            name: "Jupiter",
            description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It's a gas giant with a mass one-thousandth that of the Sun.",
            facts: [
                "Diameter: 139,820 km",
                "Distance from Sun: 778.5 million km",
                "Orbital Period: 11.86 Earth years",
                "Number of Moons: 79 known moons"
            ]
        },
        saturn: {
            name: "Saturn",
            description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It's a gas giant with an average radius about nine times that of Earth.",
            facts: [
                "Diameter: 116,460 km",
                "Distance from Sun: 1.4 billion km",
                "Orbital Period: 29.46 Earth years",
                "Notable Feature: Prominent ring system"
            ]
        }
    };

    // Get DOM elements
    const planetInfo = document.getElementById('planet-info');
    const resetViewBtn = document.getElementById('reset-view');
    const autoRotateBtn = document.getElementById('auto-rotate');
    
    // Set up planet click events
    const planets = document.querySelectorAll('.clickable');
    let autoRotate = true;
    
    planets.forEach(planet => {
        planet.addEventListener('click', function() {
            const planetId = this.id;
            displayPlanetInfo(planetId);
        });
    });
    
    // Display planet information
    function displayPlanetInfo(planetId) {
        const data = planetData[planetId];
        if (!data) return;
        
        let html = `<h4>${data.name}</h4>`;
        html += `<p>${data.description}</p>`;
        html += `<ul>`;
        data.facts.forEach(fact => {
            html += `<li>${fact}</li>`;
        });
        html += `</ul>`;
        
        planetInfo.innerHTML = html;
    }
    
    // Reset view button
    resetViewBtn.addEventListener('click', function() {
        const solarSystem = document.getElementById('solar-system');
        solarSystem.setAttribute('rotation', '0 0 0');
    });
    
    // Auto rotate toggle
    autoRotateBtn.addEventListener('click', function() {
        autoRotate = !autoRotate;
        const orbits = document.querySelectorAll('[animation]');
        
        orbits.forEach(orbit => {
            if (orbit.id.includes('orbit')) {
                if (autoRotate) {
                    orbit.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: ' + orbit.getAttribute('animation').split('dur: ')[1]);
                } else {
                    orbit.removeAttribute('animation');
                }
            }
        });
        
        autoRotateBtn.textContent = `Auto Rotate: ${autoRotate ? 'ON' : 'OFF'}`;
    });
    
    // Initialize with Sun info
    displayPlanetInfo('sun');
});

// AR Molecules Interaction
document.addEventListener('DOMContentLoaded', function() {
    // Molecule information data
    const moleculeData = {
        water: {
            name: "Water",
            formula: "H₂O",
            description: "Water is a transparent, tasteless, odorless, and nearly colorless chemical substance. It's the main constituent of Earth's streams, lakes, and oceans, and the fluids of most living organisms.",
            properties: [
                "Molecular Weight: 18.015 g/mol",
                "Melting Point: 0°C (32°F)",
                "Boiling Point: 100°C (212°F)",
                "Density: 1 g/cm³",
                "Polarity: Polar molecule"
            ],
            structure: {
                atoms: [
                    { element: "O", x: 0, y: 0, z: 0, color: "#FF0D0D" },
                    { element: "H", x: 0.757, y: 0.586, z: 0, color: "#FFFFFF" },
                    { element: "H", x: -0.757, y: 0.586, z: 0, color: "#FFFFFF" }
                ],
                bonds: [
                    { from: 0, to: 1 },
                    { from: 0, to: 2 }
                ]
            }
        },
        methane: {
            name: "Methane",
            formula: "CH₄",
            description: "Methane is a chemical compound with the chemical formula CH₄. It's the simplest alkane and the main component of natural gas.",
            properties: [
                "Molecular Weight: 16.04 g/mol",
                "Melting Point: -182.5°C (-296.5°F)",
                "Boiling Point: -161.5°C (-258.7°F)",
                "Density: 0.657 kg/m³ (gas)",
                "Shape: Tetrahedral"
            ],
            structure: {
                atoms: [
                    { element: "C", x: 0, y: 0, z: 0, color: "#909090" },
                    { element: "H", x: 0.629, y: 0.629, z: 0.629, color: "#FFFFFF" },
                    { element: "H", x: -0.629, y: -0.629, z: 0.629, color: "#FFFFFF" },
                    { element: "H", x: -0.629, y: 0.629, z: -0.629, color: "#FFFFFF" },
                    { element: "H", x: 0.629, y: -0.629, z: -0.629, color: "#FFFFFF" }
                ],
                bonds: [
                    { from: 0, to: 1 },
                    { from: 0, to: 2 },
                    { from: 0, to: 3 },
                    { from: 0, to: 4 }
                ]
            }
        },
        glucose: {
            name: "Glucose",
            formula: "C₆H₁₂O₆",
            description: "Glucose is a simple sugar with the molecular formula C₆H₁₂O₆. It's the most abundant monosaccharide and is used as an energy source in most organisms.",
            properties: [
                "Molecular Weight: 180.16 g/mol",
                "Melting Point: 146°C (295°F)",
                "Density: 1.54 g/cm³",
                "Type: Monosaccharide",
                "Function: Primary energy source for cells"
            ]
        },
        caffeine: {
            name: "Caffeine",
            formula: "C₈H₁₀N₄O₂",
            description: "Caffeine is a central nervous system stimulant of the methylxanthine class. It's the world's most widely consumed psychoactive drug.",
            properties: [
                "Molecular Weight: 194.19 g/mol",
                "Melting Point: 235°C (455°F)",
                "Density: 1.23 g/cm³",
                "Solubility: Soluble in water",
                "Effects: Stimulant, increases alertness"
            ]
        }
    };

    // Get DOM elements
    const moleculeSelect = document.getElementById('molecule-select');
    const moleculeDetails = document.getElementById('molecule-details');
    const moleculeModel = document.getElementById('molecule-model');
    
    // Set up molecule selection
    moleculeSelect.addEventListener('change', function() {
        const selectedMolecule = this.value;
        displayMoleculeInfo(selectedMolecule);
        updateMoleculeModel(selectedMolecule);
    });
    
    // Display molecule information
    function displayMoleculeInfo(moleculeId) {
        const data = moleculeData[moleculeId];
        if (!data) return;
        
        let html = `<h4>${data.name} (${data.formula})</h4>`;
        html += `<p>${data.description}</p>`;
        html += `<ul>`;
        data.properties.forEach(property => {
            html += `<li>${property}</li>`;
        });
        html += `</ul>`;
        
        moleculeDetails.innerHTML = html;
    }
    
    // Update the 3D molecule model in AR
    function updateMoleculeModel(moleculeId) {
        // Clear existing model
        while (moleculeModel.firstChild) {
            moleculeModel.removeChild(moleculeModel.firstChild);
        }
        
        const data = moleculeData[moleculeId];
        if (!data.structure) {
            // For complex molecules without defined structure, show a placeholder
            const placeholder = document.createElement('a-entity');
            placeholder.setAttribute('text', `value: ${data.formula}; align: center; color: white; width: 5`);
            placeholder.setAttribute('position', '0 0 0');
            moleculeModel.appendChild(placeholder);
            return;
        }
        
        // Create atoms
        data.structure.atoms.forEach((atom, index) => {
            const atomEntity = document.createElement('a-sphere');
            atomEntity.setAttribute('radius', '0.2');
            atomEntity.setAttribute('position', `${atom.x} ${atom.y} ${atom.z}`);
            atomEntity.setAttribute('color', atom.color);
            atomEntity.setAttribute('class', 'atom');
            
            // Add element label
            const label = document.createElement('a-entity');
            label.setAttribute('text', `value: ${atom.element}; align: center; color: black; width: 0.5`);
            label.setAttribute('position', '0 0.3 0');
            atomEntity.appendChild(label);
            
            moleculeModel.appendChild(atomEntity);
        });
        
        // Create bonds
        data.structure.bonds.forEach(bond => {
            const fromAtom = data.structure.atoms[bond.from];
            const toAtom = data.structure.atoms[bond.to];
            
            // Calculate midpoint and direction
            const midX = (fromAtom.x + toAtom.x) / 2;
            const midY = (fromAtom.y + toAtom.y) / 2;
            const midZ = (fromAtom.z + toAtom.z) / 2;
            
            const dx = toAtom.x - fromAtom.x;
            const dy = toAtom.y - fromAtom.y;
            const dz = toAtom.z - fromAtom.z;
            const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
            
            // Create cylinder for bond
            const bondEntity = document.createElement('a-cylinder');
            bondEntity.setAttribute('height', distance);
            bondEntity.setAttribute('radius', '0.05');
            bondEntity.setAttribute('position', `${midX} ${midY} ${midZ}`);
            bondEntity.setAttribute('color', '#CCCCCC');
            
            // Rotate to point from one atom to another
            const axis = [0, 1, 0]; // Default cylinder orientation is along Y-axis
            const target = [dx, dy, dz];
            
            // Calculate rotation
            const rotation = calculateRotation(axis, target);
            bondEntity.setAttribute('rotation', `${rotation.x} ${rotation.y} ${rotation.z}`);
            
            moleculeModel.appendChild(bondEntity);
        });
    }
    
    // Helper function to calculate rotation between two vectors
    function calculateRotation(axis, target) {
        // Normalize vectors
        const axisLength = Math.sqrt(axis[0]*axis[0] + axis[1]*axis[1] + axis[2]*axis[2]);
        const targetLength = Math.sqrt(target[0]*target[0] + target[1]*target[1] + target[2]*target[2]);
        
        const axisNorm = [axis[0]/axisLength, axis[1]/axisLength, axis[2]/axisLength];
        const targetNorm = [target[0]/targetLength, target[1]/targetLength, target[2]/targetLength];
        
        // Calculate cross product and dot product
        const cross = [
            axisNorm[1]*targetNorm[2] - axisNorm[2]*targetNorm[1],
            axisNorm[2]*targetNorm[0] - axisNorm[0]*targetNorm[2],
            axisNorm[0]*targetNorm[1] - axisNorm[1]*targetNorm[0]
        ];
        
        const dot = axisNorm[0]*targetNorm[0] + axisNorm[1]*targetNorm[1] + axisNorm[2]*targetNorm[2];
        
        // Calculate angle
        const angle = Math.acos(dot) * 180 / Math.PI;
        
        // Calculate axis of rotation
        const rotationAxis = cross;
        const rotationAxisLength = Math.sqrt(rotationAxis[0]*rotationAxis[0] + rotationAxis[1]*rotationAxis[1] + rotationAxis[2]*rotationAxis[2]);
        
        if (rotationAxisLength < 0.001) {
            // Vectors are parallel
            return { x: 0, y: 0, z: 0 };
        }
        
        const rotationAxisNorm = [
            rotationAxis[0]/rotationAxisLength,
            rotationAxis[1]/rotationAxisLength,
            rotationAxis[2]/rotationAxisLength
        ];
        
        // Convert to Euler angles (simplified)
        return {
            x: rotationAxisNorm[0] * angle,
            y: rotationAxisNorm[1] * angle,
            z: rotationAxisNorm[2] * angle
        };
    }
    
    // Initialize with water molecule
    displayMoleculeInfo('water');
    updateMoleculeModel('water');
});

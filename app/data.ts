// =============================================================================
// DATA.TS - Project Data & Type Definitions
// =============================================================================

export interface Project {
  id: string;
  name: string;
  context: string;
  year: string;
  description: string;
  tech: string[];
  link: string;
  linkText: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "treatment-drl",
    name: "Medical Treatment DRL",
    context: "Sequential Decision-Making Research",
    year: "2025",
    description:
      "ICU treatment timing system trained on MIMIC-III data. A2C agent achieved 99.5% clinical appropriateness with +76–145 reward improvement over baselines. Implemented rule-based safety filter boosting PPO/DQN appropriateness by 40 points. Custom 26D Gym environment with temporal lab trends and treatment effect simulation.",
    tech: ["Stable-Baselines3", "Gym", "NumPy", "Pandas", "MIMIC-III"],
    link: "https://github.com/RYANX9/medical-treatment-drl/",
    linkText: "View Code",
    image: "/clinrl.jpeg",
  },
  {
    id: "airm",
    name: "AIRM Brain Tumor System",
    context: "Clinical AI Research",
    year: "2024",
    description:
      "Clinical-grade diagnostic system achieving 99% four-class tumor classification with radiologist-validated interface. End-to-end DICOM pipeline development investigating optimal preprocessing strategies for limited medical imaging datasets. Deployment-ready architecture with clinical workflow integration.",
    tech: ["EfficientNet-B7", "PyDICOM", "PyQt5", "SQL"],
    link: "https://youtu.be/2OeqBKF3X_A",
    linkText: "Watch Demo",
    image: "/brain.jpg",
  },
  {
    id: "hemavision",
    name: "HemaVision",
    context: "Medical Automation",
    year: "2023–2024",
    description:
      "Automated hematology platform achieving 97% multi-class blood cell classification. Reduced diagnostic time from 45 minutes to 3 minutes through optimized detection pipeline. Research investigating efficient segmentation architectures for microscopy imaging in clinical workflows.",
    tech: ["YOLOv8", "U-Net", "OpenCV", "PyTorch"],
    link: "https://youtu.be/YxhA877Wyn0",
    linkText: "Watch Demo",
    image: "/blood.jpg",
  },
  {
    id: "healthcost",
    name: "Healthcare Cost Prediction",
    context: "Deep Learning Methodology",
    year: "2024",
    description:
      "Conv1D neural network achieving R² = 0.88 for insurance cost forecasting. Feature engineering with SHAP analysis identified key cost drivers. Systematic ablation study investigating optimal temporal convolution strategies for healthcare prediction tasks.",
    tech: ["Conv1D", "SHAP", "Scikit-learn", "Plotly"],
    link: "https://github.com/RYANX9/healthcare-cost-prediction",
    linkText: "View Code",
    image: "/healthcarecost.png",
  },
  {
    id: "mydailyhealth",
    name: "My Daily Health",
    context: "Research Thesis",
    year: "2023",
    description:
      "Multi-disease diagnostic platform with 90-99% accuracy across five disease domains. Systematic comparative evaluation of 12 deep learning architectures using stratified cross-validation. Transfer learning investigation for multi-domain medical classification.",
    tech: ["TensorFlow", "ResNet", "EfficientNet", "Flask"],
    link: "https://youtu.be/kh7WBjNPpEM",
    linkText: "Watch Demo",
    image: "/daily.png",
  },
];

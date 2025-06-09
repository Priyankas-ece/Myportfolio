import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brush, Code, Smartphone, Server } from "lucide-react";

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    {
      icon: Code,
      title: "Digital Design",
      description: "Designing and verifying digital circuits using SystemVerilog and UVM methodologies.",
      skill: "SystemVerilog/UVM",
      percentage: 90,
      color: "bg-primary",
    },
    {
      icon: Server,
      title: "Programming",
      description: "Proficient in multiple programming languages for software and embedded development.",
      skill: "Python/C/Java",
      percentage: 85,
      color: "bg-green-700",
    },
    {
      icon: Smartphone,
      title: "IoT Systems",
      description: "Developing Arduino-based IoT solutions for real-world monitoring applications.",
      skill: "Arduino/IoT",
      percentage: 80,
      color: "bg-red-500",
    },
    {
      icon: Brush,
      title: "Data Science",
      description: "Applying data science techniques and algorithms to solve complex problems.",
      skill: "Data Analysis",
      percentage: 75,
      color: "bg-purple-500",
    },
  ];

  const toolCategories = [
    {
      title: "Design & Verification",
      tools: ["• SystemVerilog & Verilog", "• UVM Methodology", "• Synopsys & Cadence Tools"],
    },
    {
      title: "Programming & Development",
      tools: ["• Python, C, Java, C++", "• React, HTML, CSS, JavaScript", "• Arduino IDE, VS Code"],
    },
    {
      title: "Tools & Platforms",
      tools: ["• Xilinx Vivado & Linux", "• Jupyter, Google Colab", "• Figma & MS Office"],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">Skills & Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className={`${skill.color} w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                  <Icon className="text-white text-2xl h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-secondary-dark mb-3">{skill.title}</h3>
                <p className="text-gray-600 mb-4">{skill.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{skill.skill}</span>
                    <span className="text-sm font-medium text-primary">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className={`${skill.color} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div 
          className="mt-16 bg-neutral rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {toolCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              >
                <h4 className="text-lg font-semibold text-secondary-dark mb-3">{category.title}</h4>
                <ul className="space-y-2 text-gray-600">
                  {category.tools.map((tool, toolIndex) => (
                    <li key={toolIndex}>{tool}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

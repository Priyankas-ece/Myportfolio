import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "UVM-Based D Flip-Flop Verification",
      description:
        "Developed and verified a D Flip-Flop using SystemVerilog and UVM, implementing a modular testbench for functional validation.",
      image:
        "https://tinypic.host/images/2025/06/09/dff0.png",
      technologies: ["SystemVerilog", "UVM", "Digital Design"],
      github:
        "https://github.com/Priyankas-ece/D_Flipflop_verification_with_UVM",
    },
    {
      title: "EduConnect - Mental Health App",
      description:
        "React-based mobile app with Firebase and Python, assisting 100+ students in tracking their mental health and academic progress.",
      image:
        "https://tinypic.host/images/2025/06/09/educonnect2.png",
      technologies: ["React", "Firebase", "Python"],
      github: "https://github.com/Priyankas-ece/EduConnect",
    },
    {
      title: "Water Quality Monitoring Device",
      description:
        "Arduino-based system integrating TDS sensor and IoT dashboard, improving water quality monitoring accuracy by 90%.",
      image:
        "https://tinypic.host/images/2025/06/09/watermonitor.png",
      technologies: ["Arduino", "IoT", "TDS Sensor"],
      github: "https://github.com/Priyankas-ece/Water_quality_monitor",
    },
    {
      title: "Bank Management System",
      description:
        "Python-based system with Tkinter UI and MySQL, capable of handling 500+ accounts and processing 1,000+ transactions daily.",
      image:
        "https://tinypic.host/images/2025/06/09/bank.jpg",
      technologies: ["Python", "Tkinter", "MySQL"],
      github: "https://github.com/Priyankas-ece/Bank_management_system",
    },
  ];

  const handleViewProject = (projectTitle: string) => {
    console.log(`View project: ${projectTitle}`);
  };

  const handleViewCode = (projectTitle: string) => {
    console.log(`View code: ${projectTitle}`);
  };

  const handleViewAllProjects = () => {
    console.log("View all projects");
  };

  return (
    <section id="projects" className="py-20 bg-neutral" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A section of my recent work showcasing various design and
            development skills.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <Card className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} Screenshot`}
                    className="w-full h-48 object-cover border-b border-gray-200 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-secondary-dark mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => window.open(project.github, "_blank")}
                      className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View on GitHub
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(project.github, "_blank")}
                      className="p-2 border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-all duration-200"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            onClick={handleViewAllProjects}
            className="bg-secondary-dark text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const education = [
    {
      degree: "B.E. in Electronics and Communication Engineering",
      institution: "Chennai Institute of Technology, Chennai",
      period: "2023-2027",
      cgpa: "9.51",
      icon: GraduationCap,
    },
    {
      degree: "B.S. in Data Science and Applications",
      institution: "Indian Institute of Technology, Madras",
      period: "2024-2028",
      cgpa: "8.13",
      icon: GraduationCap,
    },
  ];

  const internships = [
    {
      role: "Research Intern",
      company: "Chennai Institute of Technology",
      period: "Nov-Dec 2024",
      description:
        "Carried out research on data security and privacy in IoT-based medical applications, evaluating multiple techniques to enhance the protection of sensitive health data.",
      icon: Briefcase,
    },
    {
      role: "Intern Trainee",
      company: "Hwashin Automotive India Private Limited",
      period: "Jun 2024",
      description:
        "Gained hands-on experience in robotic automation and industrial electronics, working with 10+ robotic systems used in automotive assembly.",
      icon: Briefcase,
    },
    {
      role: "Intern Trainee",
      company: "Southern Railways EMU Shed",
      period: "May 2024",
      description:
        "Studied 20+ key components of EMU train systems, including power distribution and braking mechanisms, to understand railway electrical operations.",
      icon: Briefcase,
    },
  ];

  return (
    <section id="education" className="py-20 bg-neutral" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
            Education & Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Academic background and professional experience that shaped my
            technical expertise.
          </p>
        </motion.div>

        {/* Education */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-secondary-dark mb-8 flex items-center">
            <GraduationCap className="mr-3 text-primary" />
            Education
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => {
              const Icon = edu.icon;
              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                  }
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-secondary-dark mb-2">
                            {edu.degree}
                          </h4>
                          <p className="text-gray-600 mb-2">
                            {edu.institution}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {edu.period}
                            </span>
                            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                              CGPA: {edu.cgpa}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Internships */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-secondary-dark mb-8 flex items-center">
            <Briefcase className="mr-3 text-primary" />
            Internship Experience
          </h3>
          <div className="space-y-6">
            {internships.map((internship, index) => {
              const Icon = internship.icon;
              return (
                <motion.div
                  key={`${internship.role}-${internship.company}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-accent-yellow/10 p-3 rounded-lg">
                          <Icon className="h-6 w-6 text-accent-yellow" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-semibold text-secondary-dark">
                              {internship.role}
                            </h4>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {internship.period}
                            </span>
                          </div>
                          <p className="text-primary font-medium mb-3">
                            {internship.company}
                          </p>
                          <p className="text-gray-600 leading-relaxed">
                            {internship.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

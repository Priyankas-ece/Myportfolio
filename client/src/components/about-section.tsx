import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-dark mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate about electronics engineering and technology innovation,
            combining hardware knowledge with software skills.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-full h-96 rounded-2xl shadow-lg flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
              <img
                src="https://tinypic.host/images/2025/06/09/portrait.jpg"
                alt="Portrait"
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-secondary-dark mb-6">
              Electronics Engineer & Developer
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Currently pursuing a Bachelor of Engineering in Electronics and
              Communication Engineering at Chennai Institute of Technology,
              alongside a Bachelor of Science in Data Science from the Indian
              Institute of Technology Madras. My academic journey is focused on
              integrating core hardware knowledge with advanced software
              methodologies. I specialize in digital system design, Internet of
              Things (IoT) solutions, and embedded system development, with a
              strong emphasis on building efficient, scalable, and innovative
              technology. With a multidisciplinary foundation, I aim to bridge
              the gap between hardware implementation and software-driven
              intelligence.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-neutral rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">400+</div>
                <div className="text-gray-600">LeetCode Problems</div>
              </div>
              <div className="text-center p-4 bg-neutral rounded-lg">
                <div className="text-2xl font-bold text-primary mb-2">5+</div>
                <div className="text-gray-600">Technical Projects</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                "SystemVerilog",
                "Python",
                "Arduino",
                "IoT",
                "React",
                "Digital Design",
              ].map((skill) => (
                <span
                  key={skill}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

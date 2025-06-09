import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Github, Dribbble } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for your message.",
      });

      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSocialClick = (platform: string) => {
    const links = {
      LinkedIn: "https://www.linkedin.com/in/priyankas01",
      GitHub: "https://github.com/Priyankas-ece",
      Dribbble: "https://dribbble.com/priyanka-s",
    };

    const url = links[platform as keyof typeof links];
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Looking to innovate? Let's build your next solution together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-blue-100">
                <Mail className="w-6 h-6 text-accent-yellow mr-4" />
                <a
                  href="mailto:priyankas.ece2023@citchennai.net"
                  className="hover:text-white transition-colors duration-200"
                >
                  priyankas.ece2023@citchennai.net
                </a>
              </div>
              <div className="flex items-center text-blue-100">
                <Phone className="w-6 h-6 text-accent-yellow mr-4" />
                <span>+91-8667098201</span>
              </div>
              <div className="flex items-center text-blue-100">
                <MapPin className="w-6 h-6 text-accent-yellow mr-4" />
                <span>Chennai, Tamil Nadu</span>
              </div>
            </div>

            <div className="flex space-x-4">
              {[
                { icon: Linkedin, name: "LinkedIn" },
                { icon: Github, name: "GitHub" },
                { icon: Dribbble, name: "Dribbble" },
              ].map(({ icon: Icon, name }) => (
                <button
                  key={name}
                  onClick={() => handleSocialClick(name)}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6"
            >
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@email.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Project Type
                </label>
                <Select
                  value={formData.projectType}
                  onValueChange={(value) =>
                    handleInputChange("projectType", value)
                  }
                >
                  <SelectTrigger className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent transition-all duration-200">
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital-design">
                      Digital Design & Verification
                    </SelectItem>
                    <SelectItem value="iot-project">IoT Development</SelectItem>
                    <SelectItem value="software-development">
                      Software Development
                    </SelectItem>
                    <SelectItem value="research-collaboration">
                      Research Collaboration
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell me about your project..."
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-yellow focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent-yellow text-black py-4 px-6 rounded-lg font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-accent-yellow"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { Linkedin, Github, Dribbble } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSocialClick = (platform: string) => {
    const links = {
      LinkedIn: "https://linkedin.com/in/priyanka-s-ece",
      GitHub: "https://github.com/Priyankas-ece",
      Dribbble: "https://dribbble.com/priyanka-s"
    };
    
    const url = links[platform as keyof typeof links];
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <footer className="bg-secondary-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Priyanka S</h3>
            <p className="text-gray-400 mb-4">
              Electronics & Communication Engineering student passionate about digital design and innovative technology solutions.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Linkedin, name: "LinkedIn" },
                { icon: Github, name: "GitHub" },
                { icon: Dribbble, name: "Dribbble" },
              ].map(({ icon: Icon, name }) => (
                <button
                  key={name}
                  onClick={() => handleSocialClick(name)}
                  className="text-gray-400 hover:text-accent-yellow transition-colors duration-200"
                >
                  <Icon className="h-6 w-6" />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["home", "about", "projects", "contact"].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 capitalize"
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Expertise</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Digital Design & Verification</li>
              <li>IoT Development</li>
              <li>Software Development</li>
              <li>Research & Innovation</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© 2024 Priyanka S. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

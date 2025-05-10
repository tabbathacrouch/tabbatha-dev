import Head from "next/head";
import Image from "next/image";
import profileImage from "../assets/profile.webp";
import { IconType } from "react-icons";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMoon,
  FaSun,
  FaMailBulk,
} from "react-icons/fa";
import { useEffect, useState } from "react";

type SocialLink = {
  platform: string;
  url: string;
  icon: IconType;
};

type Project = {
  title: string;
  description: string;
  link: string;
  tags: string[];
};

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    // Or check system preference
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    setTheme(savedTheme || systemTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const socialLinks: SocialLink[] = [
    {
      platform: "GitHub",
      url: "https://github.com/tabbathacrouch",
      icon: FaGithub,
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/tabbathacrouch/",
      icon: FaLinkedin,
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/tabbathacrouch/",
      icon: FaInstagram,
    },
    {
      platform: "Instagram",
      url: "mailto:tabbatha.dev@gmail.com?subject=Portfolio Contact&body=Hi, I saw your portfolio...",
      icon: FaMailBulk,
    },
  ];

  const projects: Project[] = [
    {
      title: "Baby Names (Tinder) App",
      description:
        "A playful React + TypeScript app for swiping through baby names. Easily like or dislike names, then email your results. Perfect for parents-to-be or anyone looking for name inspiration. 😊",
      link: "https://github.com/tabbathacrouch/my-baby-names-app/",
      tags: ["React", "TypeScript", "EmailJS", "SheetBest API"],
    },
    {
      title: "Address Book",
      description:
        "Allows visitors to add contacts to an address book and search through the contacts using any field name. The project contains form validation and end-to-end testing.",
      link: "https://github.com/tabbathacrouch/AddressBook/",
      tags: ["React", "JavaScript", "Yup", "Formik", "Cypress"],
    },
    {
      title: "Chart Generator",
      description:
        "Allows visitors to create a custom vertical or horizontal bar chart, pie chart, or line chart and save the canvas as a .png file.",
      link: "https://github.com/tabbathacrouch/react-chart-generator/",
      tags: [
        "React",
        "JavaScript",
        "react-chartjs-2",
        "chart.js",
        "file-saver",
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Tabbatha - Software Engineer</title>
        <meta name="description" content={""} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 p-2 rounded-full bg-foreground dark:bg-foreground hover:bg-green-300 dark:hover:bg-green-800
                   text-green-100 transition-colors"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
        <section className="flex flex-col md:flex-row items-start gap-8 mb-16">
          <div className="relative w-48 h-48 shrink-0 rounded-full overflow-hidden">
            <Image
              src={profileImage}
              alt={"Tabbatha"}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 192px, 192px"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">Tabbatha Crouch</h1>
            <p className="text-xl mb-6">Software Engineer</p>
            <p className="text-lg leading-relaxed">
              Tabbatha has a passion for building scalable and efficient mobile
              & web applications. She has experience working with various
              technologies and frameworks, including <b>React Native</b>,{" "}
              <b>React</b>, and <b>TypeScript</b>. She is an avid plant and
              animal lover, and enjoys spending her free time learning new
              skills and tinkering with 3D printing.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 dark:text-green-900 hover:text-green-900 dark:text-green-400 dark:hover:text-green-100 transition-colors"
                  aria-label={`Visit ${link.platform} profile`}
                >
                  <span className="sr-only">{link.platform}</span>
                  {<link.icon className="w-6 h-6" />}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 rounded-lg bg-green-200 hover:bg-green-300 dark:bg-green-500 dark:hover:bg-green-600 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-900 text-grey-600 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

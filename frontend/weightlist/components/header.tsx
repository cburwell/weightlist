import Link from "next/link";

export default function Header() {
  const links = [
    {"name": "Home", "link": "/"},
    {"name": "Workouts", "link": "/workouts"},
    {"name": "Exercises", "link": "/exercises"}
  ];

  return (
    <header>
      <Link href="/#"><img id="logo" src="./img/logos/white-logo.svg" alt="Weightlist logo"/></Link>
      <div className="spacer"></div>
      <nav>
        {links.map((link) => {
          return (
            <Link href={link.link}>{link.name}</Link>
          );
        })}
      </nav>
    </header>
  );
}
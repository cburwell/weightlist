export default function Header() {
  const links = [
    {"name": "Home", "link": "/"},
    {"name": "Workouts", "link": "/workouts"},
    {"name": "Exercises", "link": "/exercises"}
  ];

  return (
    <header>
      <a href="/#"><img id="logo" src="./img/logos/white-logo.svg" alt="Weightlist logo"/></a>
      <div class="spacer"></div>
      <nav>
        {links.map((link) => {
          return (
            <a href={link.link}>{link.name}</a>
          );
        })}
      </nav>
    </header>
  );
}
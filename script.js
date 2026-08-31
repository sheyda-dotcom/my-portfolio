document.getElementById("year").textContent = new Date().getFullYear();

const chat = document.querySelector(".chat");
const messages = document.querySelector(".messages");

document.querySelector(".chat-toggle").addEventListener("click", () => {
  chat.classList.toggle("open");
});

document.querySelector(".close").addEventListener("click", () => {
  chat.classList.remove("open");
});

document.querySelector("[data-scroll]").addEventListener("click", () => {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth"
  });
});

document.querySelectorAll(".contact-copy").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.number);
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = button.dataset.number;
      document.body.append(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    }

    document.querySelector(".copied").textContent =
      `Copied! ${button.dataset.number} is ready to paste.`;
  });
});

document.querySelector(".chat-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const input = event.currentTarget.querySelector("input");
  const visitorMessage = input.value.trim();

  if (!visitorMessage) return;

  addMessage(visitorMessage, "user");
  input.value = "";

  const reply = getAutomaticReply(visitorMessage.toLowerCase());

  setTimeout(() => {
    addMessage(reply);
  }, 550);
});

function addMessage(text, type = "") {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${type}`;
  bubble.textContent = text;

  messages.append(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function getAutomaticReply(message) {
  if (
    message.includes("hi") ||
    message.includes("hello") ||
    message.includes("hey")
  ) {
    return "Hi! 👋 Welcome to my portfolio. You can ask me about my studies, skills, internship status, or contact details.";
  }

  if (
    message.includes("school") ||
    message.includes("study") ||
    message.includes("course") ||
    message.includes("university")
  ) {
    return "I am currently a first-year BS Computer Science student at the University of the Cordilleras.";
  }

  if (
    message.includes("skill") ||
    message.includes("tech") ||
    message.includes("programming")
  ) {
    return "I am currently learning HTML, CSS, JavaScript, responsive web design, and programming fundamentals. I am also interested in data engineering.";
  }

  if (
    message.includes("intern") ||
    message.includes("ojt") ||
    message.includes("work")
  ) {
    return "I am actively seeking an OJT or internship opportunity where I can learn, contribute, and gain real-world experience.";
  }

  if (
    message.includes("contact") ||
    message.includes("number") ||
    message.includes("message") ||
    message.includes("reach")
  ) {
    return "You can copy my Smart or Globe number in the Contact section, or message me through Facebook, Instagram, Telegram, or Messenger.";
  }

  if (
    message.includes("location") ||
    message.includes("from") ||
    message.includes("baguio")
  ) {
    return "I am from Baguio City, Philippines.";
  }

  if (
    message.includes("thank") ||
    message.includes("okay") ||
    message.includes("ok")
  ) {
    return "You’re welcome! Feel free to explore my portfolio or ask another question. 😊";
  }

  return "Thanks for your message! You can ask me about my studies, skills, internship availability, or how to contact me.";
}

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
  if (message.includes("contact") || message.includes("number")) {
    return "You can copy my Smart or Globe number in the Contact section, or reach me through the social links.";
  }

  if (
    message.includes("school") ||
    message.includes("study") ||
    message.includes("course")
  ) {
    return "I am currently a first-year BS Computer Science student at the University of the Cordilleras.";
  }

  if (message.includes("intern") || message.includes("ojt")) {
    return "I am actively seeking an OJT or internship opportunity and would be happy to connect.";
  }

  return "Thank you for your message! I am Sheyda, a Computer Science student from Baguio City. You may also use the contact links on this page.";
}
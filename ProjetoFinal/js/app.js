const STORAGE_KEY = "kanban-estudos-fatec-v1";

const STATUSES = ["Conteúdo para estudar", "Em Progresso", "Concluído"];

const statusToId = (status) => status.replaceAll(" ", "-");

const initialTasks = [
  {
    id: crypto.randomUUID(),
    titulo: "Cálculo Diferencial — Limites",
    descricao: "Revisar definição de limite, limites laterais e continuidade. Resolver exercícios do material da aula.",
    prioridade: "Alta",
    vencimento: "2026-05-13",
    responsaveis: "João H., Matheus F.",
    status: "Conteúdo para estudar",
    criadoEm: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    titulo: "Português — Coesão textual",
    descricao: "Conectivos, referenciação e progressão temática para melhorar a escrita acadêmica.",
    prioridade: "Média",
    vencimento: "2026-05-20",
    responsaveis: "Matheus F.",
    status: "Conteúdo para estudar",
    criadoEm: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    titulo: "Química — Estequiometria",
    descricao: "Balanceamento de equações e cálculo de reagente limitante.",
    prioridade: "Baixa",
    vencimento: "2026-05-25",
    responsaveis: "João H.",
    status: "Conteúdo para estudar",
    criadoEm: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    titulo: "Física — Cinemática",
    descricao: "MRU, MRUV, queda livre e exercícios resolvidos da lista.",
    prioridade: "Alta",
    vencimento: "2026-05-12",
    responsaveis: "Matheus F.",
    status: "Em Progresso",
    criadoEm: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    titulo: "História — Guerra Fria",
    descricao: "Contexto, blocos, corrida armamentista e espacial.",
    prioridade: "Média",
    vencimento: "2026-05-20",
    responsaveis: "João H.",
    status: "Em Progresso",
    criadoEm: new Date().toISOString()
  },
  {
    id: crypto.randomUUID(),
    titulo: "Biologia — Mitose e Meiose",
    descricao: "Fases, exemplos e aplicações genéticas. Revisão concluída.",
    prioridade: "Baixa",
    vencimento: "2026-05-07",
    responsaveis: "João H., Matheus F.",
    status: "Concluído",
    criadoEm: new Date().toISOString()
  }
];

function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    saveTasks(initialTasks);
    return initialTasks;
  }

  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function getTaskById(id) {
  return loadTasks().find((task) => task.id === id);
}

function upsertTask(taskData) {
  const tasks = loadTasks();
  const currentIndex = tasks.findIndex((task) => task.id === taskData.id);

  if (currentIndex >= 0) {
    tasks[currentIndex] = {
      ...tasks[currentIndex],
      ...taskData,
      atualizadoEm: new Date().toISOString()
    };
  } else {
    tasks.push({
      ...taskData,
      id: crypto.randomUUID(),
      criadoEm: new Date().toISOString()
    });
  }

  saveTasks(tasks);
}

function deleteTask(id) {
  const tasks = loadTasks().filter((task) => task.id !== id);
  saveTasks(tasks);
}

function updateTaskStatus(id, status) {
  const tasks = loadTasks().map((task) => {
    if (task.id === id) {
      return {
        ...task,
        status,
        atualizadoEm: new Date().toISOString()
      };
    }

    return task;
  });

  saveTasks(tasks);
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "Sem data";
  }

  const [year, month, day] = dateValue.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

function normalizeDate(dateValue) {
  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getDeadlineState(task) {
  if (task.status === "Concluído") {
    return "done";
  }

  if (!task.vencimento) {
    return "normal";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = normalizeDate(task.vencimento);
  dueDate.setHours(0, 0, 0, 0);

  const differenceInDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

  if (differenceInDays < 0) {
    return "overdue";
  }

  if (differenceInDays <= 3) {
    return "soon";
  }

  return "normal";
}

function getDeadlineBadge(task) {
  const state = getDeadlineState(task);

  if (state === "done") {
    return '<span class="badge badge-success">✓ Concluído</span>';
  }

  if (state === "overdue") {
    return '<span class="badge badge-danger">⚠ Atrasado</span>';
  }

  if (state === "soon") {
    return '<span class="badge badge-warning">⏰ Prazo próximo</span>';
  }

  return "";
}

function priorityBadgeClass(priority) {
  if (priority === "Alta") return "badge-high";
  if (priority === "Média") return "badge-medium";
  return "badge-low";
}

function cardStateClass(task) {
  const state = getDeadlineState(task);
  if (state === "done") return "is-completed";
  if (state === "overdue") return "is-overdue";
  if (state === "soon") return "is-due-soon";
  return "";
}

function renderTaskCard(task) {
  const title = escapeHTML(task.titulo);
  const description = escapeHTML(task.descricao);
  const responsible = escapeHTML(task.responsaveis);
  const priority = escapeHTML(task.prioridade);
  const date = formatDate(task.vencimento);

  return `
    <article
      class="task-card priority-${priority} ${cardStateClass(task)}"
      draggable="true"
      data-id="${task.id}"
      aria-label="${title}"
    >
      <div class="card-top">
        <div>
          <h3>${title}</h3>
          <p>${description}</p>
        </div>

        <div class="card-actions" aria-label="Ações do cartão">
          <a class="icon-btn" href="cadastro.html?id=${task.id}" title="Editar ${title}" aria-label="Editar ${title}">✎</a>
          <button class="icon-btn js-delete" type="button" data-id="${task.id}" title="Excluir ${title}" aria-label="Excluir ${title}">×</button>
        </div>
      </div>

      <div class="badges">
        <span class="badge badge-priority ${priorityBadgeClass(task.prioridade)}">${priority}</span>
        ${getDeadlineBadge(task)}
      </div>

      <div class="card-meta">
        <span>📅 ${date}</span>
        <span>👥 ${responsible}</span>
      </div>
    </article>
  `;
}

function getFilteredTasks() {
  const searchInput = document.querySelector("#searchInput");
  const priorityFilter = document.querySelector("#priorityFilter");
  const search = searchInput?.value.trim().toLowerCase() || "";
  const priority = priorityFilter?.value || "";

  return loadTasks().filter((task) => {
    const searchable = `${task.titulo} ${task.descricao} ${task.prioridade} ${task.responsaveis} ${task.vencimento}`.toLowerCase();
    const matchesSearch = !search || searchable.includes(search);
    const matchesPriority = !priority || task.prioridade === priority;

    return matchesSearch && matchesPriority;
  });
}

function renderBoard() {
  const tasks = getFilteredTasks();

  STATUSES.forEach((status) => {
    const list = document.querySelector(`#list-${statusToId(status)}`);
    const count = document.querySelector(`#count-${statusToId(status)}`);
    const tasksByStatus = tasks.filter((task) => task.status === status);

    if (!list || !count) return;

    count.textContent = tasksByStatus.length;

    if (tasksByStatus.length === 0) {
      list.innerHTML = '<p class="empty-state">Nenhum conteúdo nesta coluna.</p>';
      return;
    }

    list.innerHTML = tasksByStatus.map(renderTaskCard).join("");
  });

  updateSummary(loadTasks());
  enableCardEvents();
}

function updateSummary(tasks) {
  const summary = document.querySelector("#summary");
  if (!summary) return;

  const total = tasks.length;
  const progress = tasks.filter((task) => task.status === "Em Progresso").length;
  const done = tasks.filter((task) => task.status === "Concluído").length;

  summary.textContent = `${total} conteúdos cadastrados • ${progress} em progresso • ${done} concluído(s)`;
}

function enableCardEvents() {
  document.querySelectorAll(".task-card").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.dataset.id);
      event.dataTransfer.effectAllowed = "move";
    });
  });

  document.querySelectorAll(".js-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const task = getTaskById(button.dataset.id);

      if (task && confirm(`Deseja excluir "${task.titulo}"?`)) {
        deleteTask(task.id);
        renderBoard();
      }
    });
  });
}

function enableDropZones() {
  document.querySelectorAll(".cards").forEach((list) => {
    list.addEventListener("dragover", (event) => {
      event.preventDefault();
      list.classList.add("drag-over");
    });

    list.addEventListener("dragleave", () => {
      list.classList.remove("drag-over");
    });

    list.addEventListener("drop", (event) => {
      event.preventDefault();
      list.classList.remove("drag-over");

      const taskId = event.dataTransfer.getData("text/plain");
      const status = list.closest(".column").dataset.status;

      if (taskId && status) {
        updateTaskStatus(taskId, status);
        renderBoard();
      }
    });
  });
}

function setupBoardPage() {
  renderBoard();
  enableDropZones();

  document.querySelector("#searchInput")?.addEventListener("input", renderBoard);
  document.querySelector("#priorityFilter")?.addEventListener("change", renderBoard);

  document.querySelector("#clearFilters")?.addEventListener("click", () => {
    document.querySelector("#searchInput").value = "";
    document.querySelector("#priorityFilter").value = "";
    renderBoard();
  });
}

function setRadioValue(name, value) {
  const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
  if (radio) {
    radio.checked = true;
  }
}

function getRadioValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || "";
}

function populateForm(task) {
  if (!task) return;

  document.querySelector("#contentId").value = task.id;
  document.querySelector("#titulo").value = task.titulo;
  document.querySelector("#descricao").value = task.descricao;
  document.querySelector("#vencimento").value = task.vencimento;
  document.querySelector("#responsaveis").value = task.responsaveis;

  setRadioValue("prioridade", task.prioridade);
  setRadioValue("status", task.status);

  document.querySelector("#formHeading").textContent = "Editar conteúdo de estudo";
}

function getFormData() {
  return {
    id: document.querySelector("#contentId").value || undefined,
    titulo: document.querySelector("#titulo").value.trim(),
    descricao: document.querySelector("#descricao").value.trim(),
    prioridade: getRadioValue("prioridade"),
    vencimento: document.querySelector("#vencimento").value,
    responsaveis: document.querySelector("#responsaveis").value.trim(),
    status: getRadioValue("status")
  };
}

function validateTask(task) {
  if (!task.titulo || !task.descricao || !task.prioridade || !task.vencimento || !task.responsaveis || !task.status) {
    return "Preencha todos os campos obrigatórios antes de salvar.";
  }

  if (task.titulo.length < 3) {
    return "O título precisa ter pelo menos 3 caracteres.";
  }

  if (task.descricao.length < 10) {
    return "A descrição precisa ter pelo menos 10 caracteres.";
  }

  if (!STATUSES.includes(task.status)) {
    return "Selecione um status válido para o conteúdo.";
  }

  return "";
}

function setupFormPage() {
  const params = new URLSearchParams(window.location.search);
  const taskId = params.get("id");
  const message = document.querySelector("#formMessage");
  const deleteButton = document.querySelector("#deleteBtn");
  const form = document.querySelector("#formConteudo");

  setRadioValue("prioridade", "Média");
  setRadioValue("status", "Conteúdo para estudar");

  if (taskId) {
    const task = getTaskById(taskId);

    if (task) {
      populateForm(task);
      deleteButton.style.display = "inline-flex";
    } else {
      message.textContent = "Conteúdo não encontrado.";
      deleteButton.style.display = "none";
    }
  } else {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", () => {
    const id = document.querySelector("#contentId").value;
    const task = getTaskById(id);

    if (task && confirm(`Deseja excluir "${task.titulo}"?`)) {
      deleteTask(task.id);
      window.location.href = "index.html";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const task = getFormData();
    const validationMessage = validateTask(task);

    if (validationMessage) {
      message.textContent = validationMessage;
      return;
    }

    upsertTask(task);
    window.location.href = "index.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  if (page === "board") {
    setupBoardPage();
  }

  if (page === "form") {
    setupFormPage();
  }
});

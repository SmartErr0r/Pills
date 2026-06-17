const filters =
document.querySelectorAll(".filter");

filters.forEach(filter =>
{
    filter.addEventListener("click", () =>
    {
        filters.forEach(btn =>
        {
            btn.classList.remove("active");
        });

        filter.classList.add("active");
    });
});

const tabs =
document.querySelectorAll(".tab");

tabs.forEach(tab =>
{
    tab.addEventListener("click", () =>
    {
        tabs.forEach(btn =>
        {
            btn.classList.remove("active");
        });

        tab.classList.add("active");
    });
});

document
.querySelector(".login-btn")
.addEventListener("click", () =>
{
    alert("Здесь будет авторизация");
});

const modal =
document.getElementById("modal");

const closeModal =
document.getElementById("closeModal");

closeModal.addEventListener("click", () =>
{
    modal.classList.remove("active");
});

modal.addEventListener("click", e =>
{
    if(e.target === modal)
    {
        modal.classList.remove("active");
    }
});

document.addEventListener("keydown", e =>
{
    if(e.key === "Escape")
    {
        modal.classList.remove("active");
    }
});
(() => {
  const data = window.SITE_DATA;
  const $ = (selector) => document.querySelector(selector);


  /* =========================
     BASIC INFO
     ========================= */

  $("#name").textContent = data.name;
  $("#role").textContent = data.role;

  $("#initials").textContent =
    data.initials ||
    data.name
      .split(/\s+/)
      .map(x => x[0])
      .join("")
      .slice(0, 2);


  /* =========================
     EMAILS
     两个邮箱分别可点击
     ========================= */

  const emails =
    Array.isArray(data.emails) && data.emails.length
      ? data.emails
      : (data.email ? [data.email] : []);

  const emailContainer = $("#email");

  emailContainer.innerHTML = "";

  emails.forEach((email, index) => {
    if (index > 0) {
      const separator = document.createElement("span");
      separator.className = "email-separator";
      separator.textContent = " · ";
      emailContainer.appendChild(separator);
    }

    const link = document.createElement("a");
    link.href = `mailto:${email}`;
    link.textContent = email;
    emailContainer.appendChild(link);
  });


  /* =========================
     LOCATION
     ========================= */

  const locationElement = $("#location");

  if (locationElement) {
    locationElement.textContent = data.location || "";
  }


  /* =========================
     FOOTER
     ========================= */

  $("#footer-name").textContent = data.name;
  $("#year").textContent = new Date().getFullYear();


  /* =========================
     BIO
     ========================= */

  data.bio.forEach(paragraph => {
    const p = document.createElement("p");
    p.innerHTML = paragraph;
    $("#bio").appendChild(p);
  });


  /* =========================
     RESEARCH
     ========================= */

  const researchIntro = $("#research-intro");
  const researchList = $("#research-list");

  if (data.research_intro) {
    researchIntro.textContent = data.research_intro;
  }

  if (Array.isArray(data.research_topics)) {
    data.research_topics.forEach(topic => {
      const li = document.createElement("li");

      const strong = document.createElement("strong");
      strong.textContent = topic.title;

      li.appendChild(strong);
      li.appendChild(
        document.createTextNode(
          `, ${topic.description}`
        )
      );

      researchList.appendChild(li);
    });
  }


  /* =========================
     PROFILE PHOTO
     ========================= */

  const photo = $("#profile-photo");
  const placeholder = document.querySelector(".portrait-placeholder");

  photo.addEventListener("load", () => {
    placeholder.style.display = "none";
  });

  photo.addEventListener("error", () => {
    photo.style.display = "none";
    placeholder.style.display = "flex";
  });


  /* =========================
     PUBLICATIONS
     按 site-data.js 里的顺序显示
     不额外显示年份
     ========================= */

  const list = $("#publication-list");

  data.publications.forEach(pub => {
    list.appendChild(
      renderPublication(pub)
    );
  });


  /* =========================
     PUBLICATION CARD
     ========================= */

  function renderPublication(pub) {
    const article = document.createElement("article");
    article.className = "publication";


    /* MEDIA */

    const media = document.createElement("div");
    media.className = "pub-media";


    /* POSTER */

    if (pub.poster) {
      const poster = document.createElement("img");

      poster.src = pub.poster;
      poster.alt = `${pub.title} preview`;
      poster.loading = "lazy";

      media.appendChild(poster);
    }


    /* VIDEO */

    if (pub.video) {
      const video = document.createElement("video");

      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.src = pub.video;

      video.setAttribute(
        "aria-label",
        `Demo video for ${pub.title}`
      );

      video.addEventListener(
        "error",
        () => media.classList.add("is-fallback")
      );

      video.addEventListener(
        "loadeddata",
        () => media.classList.remove("is-fallback")
      );

      media.appendChild(video);
    }


    /* INFO */

    const info = document.createElement("div");
    info.className = "pub-info";


    /* BADGES */

    const topline = document.createElement("div");
    topline.className = "pub-topline";

    if (pub.type) {
      const badge = document.createElement("span");

      badge.className = "badge";
      badge.textContent = pub.type;

      topline.appendChild(badge);
    }

    if (pub.award) {
      const award = document.createElement("span");

      award.className = "badge award";
      award.textContent = `🏅 ${pub.award}`;

      topline.appendChild(award);
    }


    /* TITLE */

    const title = document.createElement("h3");

    title.className = "pub-title";
    title.textContent = pub.title;


    /* AUTHORS */

    const authors = document.createElement("p");

    authors.className = "pub-authors";

    pub.authors.forEach((author, i) => {
      if (i > 0) {
        authors.appendChild(
          document.createTextNode(", ")
        );
      }

      if (author === data.name) {
        const strong = document.createElement("strong");

        strong.textContent = author;
        authors.appendChild(strong);
      } else {
        authors.appendChild(
          document.createTextNode(author)
        );
      }
    });


    /* VENUE */

    const venue = document.createElement("p");

    venue.className = "pub-venue";
    venue.textContent = pub.venue;


    info.append(
      topline,
      title,
      authors,
      venue
    );


    /* LINKS */

    if (pub.links && pub.links.length) {
      const links = document.createElement("div");

      links.className = "pub-links";

      pub.links.forEach(item => {
        const a = document.createElement("a");

        a.href = item.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = item.label;

        links.appendChild(a);
      });

      info.appendChild(links);
    }


    article.append(media, info);

    return article;
  }

})();

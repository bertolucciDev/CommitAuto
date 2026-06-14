const modern =
  require("./modern");

const minimal =
  require("./minimal");

const enterprise =
  require("./enterprise");

const openSource =
  require("./open-source");

const templates = {
  modern,

  minimal,

  enterprise,

  "open-source":
    openSource
};

function getTemplate(
  templateName
) {
  return (
    templates[templateName] ||
    templates.modern
  );
}

module.exports = {
  getTemplate
};

// Data file

// BASE_DIR = "../data";
BASE_DIR = "https://raw.githubusercontent.com/mathvista/data/main"

DATA_FILE = "data_public.js"; // default, answers for testmini, no answer for test

// // Variables for the filters
// let number_options = [20, 50, 100, 200, 500, "All"];   
// let question_types = ["All", "free_form", "multi_choice"];
// let answer_types = ["All", "integer", "float", "list", "text"];
// let languages = ["All", "english", "chinese", "persian"];
// let sources = ["All", "A-OKVQA", "AI2D", "CLEVR-Math", "ChartQA", "DVQA", "DocVQA", "FigureQA", "FunctionQA", "GEOS", "GeoQA+", "Geometry3K", "IQTest", "IconQA", "KVQA", "MapQA", "PMC-VQA", "PaperQA", "ParsVQA-Caps", "PlotQA", "SciBench", "ScienceQA", "Super-CLEVR", "TQA", "TabMWP", "TextVQA", "TheoremQA", "UniGeo", "VQA-AS", "VQA-RAD", "VQA2.0", "VizWiz"];
// let categories = ["All", "general-vqa", "math-targeted-vqa"];
// let tasks = ["All", "figure question answering", "geometry problem solving", "math word problem", "textbook question answering", "visual question answering"];
// let contexts = ["All", "abstract scene", "bar chart", "document image", "function plot", "geometry diagram", "heatmap chart", "line plot", "map chart", "medical image", "natural image", "pie chart", "puzzle test", "radar chart", "scatter plot", "scientific figure", "synthetic scene", "table", "violin plot", "word cloud"];
// let grades = ["All", "not applicable", "elementary school", "high school", "college"];
// let skills = ["All"];

// Variables for the filters with the number of questions
let number_options = [20, 50, 100, 200];  
let splits = ["All", "testmini (1000)", "test (5141)"];    
let question_types = ["All", "free_form (2749)", "multi_choice (3392)"];
let answer_types = ["All", "text (3392)", "integer (2461)", "float (272)", "list (16)"];
let languages = ["All", "english (5737)", "chinese (400)", "persian (4)"];
let sources = ["All", "A-OKVQA (16)", "AI2D (267)", "CLEVR-Math (400)", "ChartQA (317)", "DVQA (400)", "DocVQA (59)", "FigureQA (400)", "FunctionQA (400)", "GEOS (119)", "GeoQA+ (400)", "Geometry3K (400)", "IQTest (228)", "IconQA (400)", "KVQA (382)", "MapQA (30)", "PMC-VQA (2)", "PaperQA (108)", "ParsVQA-Caps (4)", "PlotQA (105)", "SciBench (94)", "ScienceQA (38)", "Super-CLEVR (400)", "TQA (85)", "TabMWP (400)", "TextVQA (14)", "TheoremQA (53)", "UniGeo (400)", "VQA-AS (26)", "VQA-RAD (4)", "VQA2.0 (188)", "VizWiz (2)"];
let categories = ["All", "math-targeted-vqa (3402)", "general-vqa (2739)"];
let tasks = ["All", "figure question answering (1647)", "geometry problem solving (1319)", "math word problem (1200)", "textbook question answering (937)", "visual question answering (1038)"];
let contexts = ["All", "abstract scene (375)", "bar chart (781)", "document image (59)", "function plot (400)", "geometry diagram (1370)", "heatmap chart (1)", "line plot (202)", "map chart (30)", "medical image (6)", "natural image (615)", "pie chart (97)", "puzzle test (226)", "radar chart (4)", "scatter plot (205)", "scientific figure (518)", "synthetic scene (800)", "table (450)", "violin plot (1)", "word cloud (1)"];
let grades = ["All",  "elementary school (1272)", "high school (1895)", "college (661)", "not applicable (2313)"];
let skills = ["All", "algebraic reasoning (1748)", "arithmetic reasoning (2093)", "geometry reasoning (1429)", "logical reasoning (231)", "numeric commonsense (858)", "scientific reasoning (655)", "statistical reasoning (1870)"];

// Elements in the Option Panel
let optbtn = document.getElementsByClassName("optionsbtn")[0];
let closebtn = document.getElementsByClassName("closebtn")[0];
let optionpanel = document.getElementById("option-panel");
let optboxes = document.getElementsByClassName("optbox");
let opt_dds = document.getElementsByClassName("opt-dd");
let filter_submit = document.getElementById("filter-submit");

// Element Text the Option Panel
let number_dd = make_dropdown("How many samples?", number_options, "number_dd");
let split_dd = make_dropdown("Choose a split:", splits, "split_dd");
let question_type_dd = make_dropdown("Choose a question type:", question_types, "question_type_dd");
let answer_type_dd = make_dropdown("Choose an answer type:", answer_types, "answer_type_dd");
let language_dd = make_dropdown("Choose a language:", languages, "language_dd");
let source_dd = make_dropdown("Choose a source dataset:", sources, "source-dd");
let category_dd = make_dropdown("Choose a category:", categories, "category_dd");
let task_dd = make_dropdown("Choose a task:", tasks, "task_dd");
let context_dd = make_dropdown("Choose a context:", contexts, "context_dd");
let grade_dd = make_dropdown("Choose a grade:", grades, "grade_dd");
let skill_dd = make_dropdown("Choose a skill:", skills, "skill_dd");

// Content in the Option Box
optboxes[0].innerHTML += number_dd;
optboxes[0].innerHTML += split_dd;
optboxes[0].innerHTML += question_type_dd;
optboxes[0].innerHTML += answer_type_dd;
optboxes[0].innerHTML += language_dd;
optboxes[0].innerHTML += source_dd;
optboxes[0].innerHTML += category_dd;
optboxes[0].innerHTML += task_dd;
optboxes[0].innerHTML += context_dd;
optboxes[0].innerHTML += grade_dd;
optboxes[0].innerHTML += skill_dd;

// Elements in the Content Body
let body = document.getElementById("content-body");
let display = document.getElementById("display");

// Click actions for the option buttons
optbtn.addEventListener("click", openNav);
closebtn.addEventListener("click", closeNav);

// Responsive: if screen is narrow, body only displays one column
if (window.innerWidth < 600) {
    body.style.flexDirection = "column";
}

// Set up the data filters and display the page
let filters = {};

for (each of opt_dds) {
    each.addEventListener("change", change_filters);
}

// Display the page when clicking the fresh button
filter_submit.addEventListener("click", filter_data);
if (window.innerWidth < 600) {
    filter_submit.addEventListener("click", closeNav);
}

// Display the page when it is running at the first time
filter_data();

// Functions
var display_padding = display.style.padding;
function openNav() {
    if (window.innerWidth < 600) {
        // optionpanel.style.zIndex = "2";
        optionpanel.style.width = "100vw";
        display.style.width = "0vw";
        display.style.padding = "0";
    } else {
        optionpanel.style.width = "30vw";
        display.style.width = "50vw";
    }
    for (each of optionpanel.children) 
        each.style.display = "block";
}

function closeNav() {
    // display.style.display = "block";
    optionpanel.style.width = "0vw";
    display.style.width = "100vw";
    display
    for (each of optionpanel.children) {
        each.style.display = "none";
    }
}

// Function: update the filter values
function change_filters(e) {
    filters.source = document.getElementById("source-dd").value;
    filters.split = document.getElementById("split_dd").value;
    filters.number = document.getElementById("number_dd").value;
    filters.question_type = document.getElementById("question_type_dd").value;
    filters.answer_type = document.getElementById("answer_type_dd").value;
    filters.language = document.getElementById("language_dd").value;
    filters.category = document.getElementById("category_dd").value;
    filters.task = document.getElementById("task_dd").value;
    filters.context = document.getElementById("context_dd").value;
    filters.grade = document.getElementById("grade_dd").value;
    filters.skill = document.getElementById("skill_dd").value;
    // console.log(filters);
}

// Function: draw the page
function create_page(d) {
    if (d.length === 0) {
        body.innerHTML = "<p>No number satisfies All the filters.</p>";
    } else {
        col1 = create_col(d.slice(0, d.length / 2));
        col2 = create_col(d.slice(d.length / 2));
        body.innerHTML = col1 + col2;
    }
    reflow(body);
    console.log("reflowed");
}

function create_col(data) {
    res = [];

    for (each of data) {
        res.push(create_number(each));
    }

    return `<div class="display-col"> ${res.join("")} </div>`;
}

// data is an object with the following attr.
function create_number(data) {
    let question = make_qt(data.pid, data.question, data.unit);

    // let hint = make_hint(data.hint)
    let image = "";
    if (data.image !== -1)
        // image = make_img(`${BASE_DImetadataR}/${filters.dataset}/${data.image}`);
        image = make_img(`${BASE_DIR}/${data.image}`);

    let choices = "";
    if (data.question_type === "multi_choice")
        choices = make_choices(data.choices);

    // if data has the answer attr.
    let answer = "";
    if ("answer" in data)
        answer = make_answer(data.answer);

    html = make_box([question, image, choices, answer]) + "<hr/>";

    return html;
}

// creates a div with question text in it
function make_qt(pid, question, unit) {
    let html = "";
    if (unit === null)
        html = `
                <p><b>Question </b></p>
                <p class="question-txt">[No.${pid}] ${question}</p>
        `;
    else
        html = `
                <p><b>Question </b></p>
                <p class="question-txt">[No.${pid}] ${question} (unit: ${unit})</p>
        `;
    return html;
}

function make_hint(hint) {
    if (hint === null) return "";
    let html = `<p><b>Context </b></p><p class="hint-txt">${hint}</p>`;
    return html;
}

function make_img(path) {
    if (path === null) return "";
    let html = `<img src="${path}" alt="number image" class="question-img" />`;
    return html;
}

function make_box(contents, cls = "") {
    if (contents.join("").length === 0) return "";
    let html = `
        <div class="box ${cls}"> 
            ${contents.join(" ")}
        </div>
    `;
    return html;
}

function make_choices(choices) {
    // console.log(choices);
    let temp = "";
    let len = 0;
    for (each of choices) {
        let html = make_choice(each);
        temp += html;
        len += each.length;
    }
    let html = "";
    if (len < 60)
        html = `<p><b>Choices </b></p><div class="choices">${temp}</div>`;
    else
        html = `<p><b>Choices </b></p><div class="choices-vertical">${temp}</div>`;
    return html;
}
function make_choice(choice) {
    let html = `<p class="choice-txt">${choice}</p>`;
    return html;
}

function make_answer(answer) {
    let html = `<p><b>Answer </b></p><p class="answer-txt">${answer}</p>`;
    return html;
}

function make_dropdown(label, options, id, default_ind = 0) {
    let html = "";
    for (let i = 0; i < options.length; i++) {
        if (i === default_ind)
            html += `<option value="${options[i]}" selected> ${options[i]} </option>`;
        else
            html += `<option value="${options[i]}"> ${options[i]} </option>`;
    }
    html = `<label class="dd-label">${label} <select id="${id}" class="opt-dd"> ${html} </select> </label><br/>`;
    return html;
}


// Main Functions (FIXME: need to be updated)
async function filter_data() {
    // set up or update the filter
    change_filters();

    console.log(filters);
    // e.g. data/{"dataset": "CLEVR-Math", "number": 20}

    // success event 
    let scriptEle = document.createElement("script");
    // scriptEle.setAttribute("src", `data/${filters.dataset}_test.js`);
    scriptEle.setAttribute("src", `data/${DATA_FILE}`);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", false);
    document.body.appendChild(scriptEle);

    scriptEle.addEventListener("load", () => {
        console.log("File loaded");
        res = test_data;
        // console.log(res);


        // go over res and add pid to each element
        for (let i of Object.keys(res)) {
            res[i].pid = i;
        }

        // filter: source dataset
        // go through All the res dict and filter the data with the source name
        // split the source name with "-" and get the first element
        filters.source = filters.source.split(" (")[0];
        if (filters.source !== "All") {
            for (let i of Object.keys(res)) {
                if (res[i].metadata.source.toString() !== filters.source) {
                    delete res[i];
                }
            }
        }

        // filter: split
        filters.split = filters.split.split(" (")[0];
        if (filters.split !== "All") {
            for (let i of Object.keys(res)) {
                if (res[i].metadata.split.toString() !== filters.split) {
                    delete res[i];
                }
            }
        }

        // filter: question type
        filters.question_type = filters.question_type.split(" (")[0];
        if (filters.question_type !== "All") {
            for (let i of Object.keys(res)) {
                if (res[i].question_type.toString() !== filters.question_type) {
                    delete res[i];
                }
            }
        }

        // filter: answer type
        filters.answer_type = filters.answer_type.split(" (")[0];
        if (filters.answer_type !== "All") {
            for (let i of Object.keys(res)) {
                if (res[i].answer_type.toString() !== filters.answer_type) {
                    delete res[i];
                }
            }
        }

        // filter: language
        filters.language = filters.language.split(" (")[0];
        if (filters.language !== "All") {
            for (let i of Object.keys(res)) {
                if (res[i].metadata.language.toString() !== filters.language) {
                    delete res[i];
                }
            }
        }

        // filter: category
        filters.category = filters.category.split(" (")[0];
        if (filters.category !== "All") {
            for (let i of Object.keys(res)) {
                if (res[i].metadata.category.toString() !== filters.category) {
                    delete res[i];
                }
            }
        }
    
        // filter: task
        filters.task = filters.task.split(" (")[0];
        if (filters.task !== "All") {
            for (let i of Object.keys(res)) {
                if (res[i].metadata.task.toString() !== filters.task) {
                    delete res[i];
                }
            }
        }

        // filter: context
        filters.context = filters.context.split(" (")[0];
        if (filters.context !== "All") {
            for (let i of Object.keys(res)) {
                if (res[i].metadata.context.toString() !== filters.context) {
                    delete res[i];
                }
            }
        }

        // filter: grade
        filters.grade = filters.grade.split(" (")[0];
        if (filters.grade !== "All") {
            for (let i of Object.keys(res)) {
                if (res[i].metadata.grade.toString() !== filters.grade) {
                    delete res[i];
                }
            }
        }
    
        // filter: skill
        filters.skill = filters.skill.split(" (")[0];
        if (filters.skill !== "All") {
            for (let i of Object.keys(res)) {
                // metadata.skill is a list
                if (!res[i].metadata.skills.includes(filters.skill)) {
                    delete res[i];
                }
            }
        }

        // filter: number
        cnt = filters.number;
        if (cnt != "All") {
            cnt = Number.parseInt(cnt);
            d = _.sample(res, Math.min(cnt, Object.keys(res).length));

        } else {
            d = [];
            for (let i of Object.keys(res)) {
                d.push(res[i]);
            }
        }

        // for (each of d) {
        //     console.log(d);
        // }
        create_page(d);
    });
}

// force the browser to reflow
function reflow(elt) {
    elt.offsetHeight;
}

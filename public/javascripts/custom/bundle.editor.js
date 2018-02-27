var languages = {
    "C": {code: "1", name: "c_cpp"},
    "C++": {code: "2", name: "c_cpp"},
    "C#": {code: "9", name: "csharp"},
    "CoffeeScript": {code: "59", name: "coffee"},
    "Go": {code: "21", name: "golang"},
    "Haskell": {code: "12", name: "haskell"},
    "Java": {code: "3", name: "java"},
    "Java8": {code: "43", name: "java"},
    "JavaScript": {code: "20", name: "javascript"},
    "Kotlin": {code: "71", name: "kotlin"},
    "Pascal": {code: "25", name: "pascal"},
    "PHP": {code: "7", name: "php"},
    "Python3": {code: "30", name: "python"},
    "Rust": {code: "50", name: "rust"},
    "Scala": {code: "15", name: "scala"},
    "Swift": {code: "51", name: "swift"},
    "TypeScript": {code: "66", name: "typescript"}
};
var themes = {
    "Ambiance": "ambiance",
    "Chaos": "chaos",
    "Chrome": "chrome",
    "Clouds": "clouds",
    "CloudsMidnight": "clouds_midnight",
    "Cobalt": "cobalt",
    "CrimsonEditor": "crimson_editor",
    "Dawn": "dawn",
    "Dracula": "dracula",
    "DreamWeaver": "dreamweaver",
    "Eclipse": "eclipse",
    "Github": "github",
    "Gob": "gob",
    "Gruvbox": "gruvbox",
    "IdleFingers": "idle_fingers",
    "Iplastic": "iplastic",
    "Katzenmilch": "katzenmilch",
    "KrTheme": "kr_theme",
    "Kuroir": "kuroir",
    "Merbivore": "merbivore",
    "MerbivoreSoft": "merbivore_soft",
    "MonoIndustrial": "mono_industrial",
    "Monokai": "monokai",
    "PastelOnDark": "pastel_on_dark",
    "SolarizedDark": "solarized_dark",
    "SolarizedLight": "solarized_light",
    "SqlServer": "sqlserver",
    "Terminal": "terminal",
    "Tomorrow": "tomorrow",
    "TomorrowNight": "tomorrow_night",
    "TomorrowNightBlue": "tomorrow_night_blue",
    "TomorrowNightBright": "tomorrow_night_bright",
    "TomorrowNightEighties": "tomorrow_night_eighties",
    "Twilight": "twilight",
    "VibrantInk": "vibrant_ink",
    "Xcode": "xcode"
};

var currentLang = 'Python3';
var currentLangName = 'python';
var currentLangCode = '30';
var currentTheme = 'Monokai';
var currentThemeName = 'monokai';
var currentFontSize = '18';

$("#language-menu").find("option:contains('Python3')").attr("selected",true);
$("#theme-menu").find("option:contains('Monokai')").attr("selected",true);
$("#fontsize-menu").find("option:contains('18')").attr("selected",true);

var editor = ace.edit("editor");
ace.require("ace/ext/language_tools");
editor.setTheme("ace/theme/" + currentThemeName);
editor.setFontSize(parseInt(currentFontSize));
editor.session.setMode("ace/mode/" + currentLangName);
editor.setOptions({
    wrap: 'free',
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true
});

$('#language-menu').change(function () {
    currentLang = $(this).val();
    currentLangName = languages[$(this).val()].name;
    currentLangCode = languages[$(this).val()].code;
    editor.session.setMode("ace/mode/" + currentLangName);
});

$('#theme-menu').change(function () {
    currentTheme = $(this).val();
    currentThemeName = themes[$(this).val()];
    editor.setTheme("ace/theme/" + currentThemeName);
});

$('#fontsize-menu').change(function () {
    currentFontSize = $(this).val();
    editor.setFontSize(parseInt(currentFontSize));
});

$('#run-btn').click(function () {
    $('#run-btn').text('正在运行');
    var source = editor.getValue();
    var lang = currentLangCode;
    var testCases = '["' + document.getElementById("input").value + '"]';
    var apiKey = 'hackerrank|3102159-1916|c2ce1549342aca1284225739a0d4619331855333';
    var wait = 'true';
    var data = new FormData();
    data.append("source", source);
    data.append("lang", lang);
    data.append("testcases", testCases);
    data.append("api_key", apiKey);
    data.append("wait", wait);
    $.ajax({
        url: '/code-api/run',
        type: 'post',
        dataType: 'json',
        processData:false,
        contentType:false,
        data: data,
        success: function (res) {
            var outputText = '';
            if (res.result.censored_compile_message.length != 0) {
                outputText = outputText + res.result.censored_compile_message + '\n';
            }
            if (res.result.compile_command.length != 0) {
                outputText = outputText + res.result.compile_command + '\n';
            }
            if (res.result.compilemessage.length != 0) {
                outputText = outputText + res.result.compilemessage + '\n';
            }
            outputText = outputText + res.result.time[0] + 's\n';
            if (res.result.message[0] == 'Runtime error') {
                outputText = outputText + res.result.stderr[0];
            }
            if (res.result.message[0] == 'Success') {
                outputText = outputText + res.result.stdout[0];
            }
            $('#output').html(outputText);
            $('#run-btn').text('运行代码');
        },
        error: function (err) {
            alert('代码提交失败, 请重试!');
            $('#run-btn').text('运行代码');
        }
    });
});
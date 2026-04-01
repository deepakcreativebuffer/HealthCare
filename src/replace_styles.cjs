const fs = require('fs');
const path = require('path');

const dirPath = path.join('e:', 'HealthCare', 'src', 'components');

const rules = {
    // Text colors
    "text-slate-900": "text-gray-900",
    "text-slate-800": "text-gray-800",
    "text-slate-700": "text-gray-700",
    "text-slate-600": "text-gray-600",
    "text-slate-500": "text-gray-500",
    "text-slate-400": "text-gray-400",
    "text-slate-300": "text-gray-300",
    "text-slate-200": "text-gray-200",
    "text-slate-100": "text-gray-100",
    "text-slate-50": "text-gray-50",
    
    // Background colors
    "bg-slate-900": "bg-gray-900",
    "bg-slate-800": "bg-gray-800",
    "bg-slate-700": "bg-gray-700",
    "bg-slate-600": "bg-gray-600",
    "bg-slate-500": "bg-gray-500",
    "bg-slate-400": "bg-gray-400",
    "bg-slate-300": "bg-gray-300",
    "bg-slate-200": "bg-gray-200",
    "bg-slate-100": "bg-gray-100",
    "bg-slate-50": "bg-gray-50",
    
    // Border colors
    "border-slate-900": "border-gray-900",
    "border-slate-800": "border-gray-800",
    "border-slate-700": "border-gray-700",
    "border-slate-600": "border-gray-600",
    "border-slate-500": "border-gray-500",
    "border-slate-400": "border-gray-400",
    "border-slate-300": "border-gray-300",
    "border-slate-200": "border-gray-200",
    "border-slate-100": "border-gray-100",
    "border-slate-50": "border-gray-50",

    // Brand colors
    "text-[#009bf2]": "text-blue-600",
    "text-action-blue": "text-blue-600",
    "text-[#129FED]": "text-blue-600",
    "bg-[#009bf2]": "bg-blue-600",
    "bg-action-blue": "bg-blue-600",
    "bg-[#129FED]": "bg-blue-600",
    "border-[#009bf2]": "border-blue-600",
    "border-[#129FED]": "border-blue-600",
    "border-action-blue": "border-blue-600",
    
    // Hover states
    "hover:bg-[#009bf2]": "hover:bg-blue-700",
    "hover:bg-[#0089d8]": "hover:bg-blue-700",
    "hover:bg-action-blue": "hover:bg-blue-700",
    "hover:text-[#009bf2]": "hover:text-blue-700",
    "hover:text-action-blue": "hover:text-blue-700",
    
    // Focus rings
    "focus:border-[#129FED]": "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500",
    "focus:border-[#009bf2]": "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500",
    "focus:ring-[#129FED]/5": "",
    "focus:ring-[#009bf2]/5": ""
};

const inputPattern = /(<input[^>]*className=["'])([^"']+)(["'][^>]*>)/g;
const selectPattern = /(<select[^>]*className=["'])([^"']+)(["'][^>]*>)/g;

const residentInputClasses = "flex h-8 w-full rounded-lg border border-gray-200 bg-gray-50/50 px-2 py-1 text-[13px] ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

function replaceAll(str, mapObj) {
    let result = str;
    for (const [key, value] of Object.entries(mapObj)) {
        result = result.split(key).join(value);
    }
    return result;
}

function processFile(filepath) {
    let content = fs.readFileSync(filepath, 'utf-8');
    const origContent = content;

    content = replaceAll(content, rules);

    function replInput(match, p1, p2, p3) {
        if (p2.includes("border") && p2.includes("rounded") && !match.toLowerCase().includes("checkbox") && !p2.includes("file:")) {
            const layoutClasses = p2.split(' ').filter(c => c.startsWith('w-') || c.startsWith('max-w-') || c.startsWith('flex-1') || c.startsWith('pl-') || c.startsWith('pr-') || c.startsWith('ml-') || c.startsWith('mr-') || c.startsWith('mt-') || c.startsWith('mb-'));
            const merged = residentInputClasses + (layoutClasses.length ? ' ' + layoutClasses.join(' ') : '');
            return p1 + merged + p3;
        }
        return match;
    }

    content = content.replace(inputPattern, replInput);
    content = content.replace(selectPattern, replInput);

    if (content !== origContent) {
        fs.writeFileSync(filepath, content, 'utf-8');
        console.log(`Updated ${filepath}`);
    }
}

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            processFile(fullPath);
        }
    });
}

walk(dirPath);
console.log("Done");

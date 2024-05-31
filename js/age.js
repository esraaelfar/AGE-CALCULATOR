function isValidDate(day, month, year) {
    const date = new Date(year, month, day);
    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
}

function calculateAge() {
    const today = new Date();
    const day = document.getElementById('day').value || document.getElementById('day').placeholder;
    const month = (document.getElementById('month').value || document.getElementById('month').placeholder) - 1; 
    const year = document.getElementById('year').value || document.getElementById('year').placeholder;

    const dayInt = parseInt(day);
    const monthInt = parseInt(month);
    const yearInt = parseInt(year);

    if (!isValidDate(dayInt, monthInt, yearInt)) {
        document.getElementById('years').textContent = 'Invalid';
        document.getElementById('months').textContent = 'Invalid';
        document.getElementById('days').textContent = 'Invalid';
        document.getElementById('hours').textContent = 'Invalid';
        document.getElementById('minutes').textContent = 'Invalid';
        document.getElementById('seconds').textContent = 'Invalid';
        return;
    }

    const birthDate = new Date(yearInt, monthInt, dayInt);
    
    let ageYears = today.getFullYear() - birthDate.getFullYear();

    let ageMonths = today.getMonth() - birthDate.getMonth();
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    let ageDays = today.getDate() - birthDate.getDate();
    if (ageDays < 0) {
        ageMonths--;
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }
        const lastMonth = (today.getMonth() - 1 + 12) % 12;
        const lastMonthDays = new Date(today.getFullYear(), lastMonth + 1, 0).getDate();
        ageDays += lastMonthDays;
    }

    // Calculate total age in other units
    const ageHours = Math.floor((today - birthDate) / (1000 * 60 * 60));
    const ageMinutes = Math.floor((today - birthDate) / (1000 * 60));
    const ageSeconds = Math.floor((today - birthDate) / 1000);

    document.getElementById('years').textContent = ageYears;
    document.getElementById('months').textContent = ageMonths;
    document.getElementById('days').textContent = ageDays;
    document.getElementById('hours').textContent = ageHours;
    document.getElementById('minutes').textContent = ageMinutes;
    document.getElementById('seconds').textContent = ageSeconds;
}

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    document.getElementById('day').placeholder = String(today.getDate()).padStart(2, '0');
    document.getElementById('month').placeholder = String(today.getMonth() + 1).padStart(2, '0'); 
    document.getElementById('year').placeholder = today.getFullYear();

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', calculateAge);
    });

    calculateAge();
});
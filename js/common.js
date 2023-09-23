let memberNumbers = [];
let priorityMembers = [];
let nonPriorityMembers = [];
let priorityWinners = [];
let nonPriorityWinners = [];

function assignNumbers() {
    const memberCount = parseInt(document.getElementById("memberCount").value);
    memberNumbers = Array.from({ length: memberCount }, (_, i) => i + 1);
    alert("生徒人数の登録が完了しました。");
}

function drawLottery() {
    const priorityCount = parseInt(document.getElementById("priorityCount").value);
    const priorityNumbersInput = document.getElementById("priorityNumbers").value;
    priorityMembers = priorityNumbersInput.split(",").map(num => parseInt(num));

    nonPriorityMembers = memberNumbers.filter(num => !priorityMembers.includes(num));

    const lotteryResultList = document.getElementById("lotteryResult");
    lotteryResultList.innerHTML = "";

    function drawNextMember(pool, isPriority) {
        if (pool.length > 0) {
            const randomIndex = Math.floor(Math.random() * pool.length);
            const winner = pool.splice(randomIndex, 1)[0];
            const listItem = document.createElement("li");
            const winnerType = isPriority ? "座席指定" : "生徒";

            if (isPriority) {
                priorityWinners.push(winner);
                listItem.textContent = `${winnerType}${priorityWinners.length}:座席番号${winner}`;
                listItem.classList.add("reserved_seat"); // 優先メンバーにクラスを付与
            } else {
                nonPriorityWinners.push(winner);
                listItem.textContent = `${winnerType}${nonPriorityWinners.length}:座席番号${winner}`;

            }

            lotteryResultList.appendChild(listItem);
        }
    }

    for (let i = 0; i < priorityCount; i++) {
        drawNextMember(priorityMembers, true);
    }

    for (let i = 0; i < memberNumbers.length - priorityCount; i++) {
        if (nonPriorityMembers.length > 0) {
            drawNextMember(nonPriorityMembers, false);
        } else {
            const unusedNumber = memberNumbers.find(num => !priorityWinners.includes(num) && !nonPriorityWinners.includes(num));
            drawNextMember([unusedNumber], false);
        }
    }
}
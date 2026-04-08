document.addEventListener("DOMContentLoaded", () => {
    console.log("App is ready! Connecting UI with API...");

    // Enhanced helper function for better result display
    const displayResult = (elementId, message, isError = false) => {
        const resultBox = document.getElementById(elementId);
        resultBox.innerHTML = message;
        resultBox.classList.remove('success', 'error');
        resultBox.classList.add(isError ? 'error' : 'success');
    };

    // ==========================================
    // 0. Create Account
    // ==========================================
    document.getElementById("btn-create").addEventListener("click", async () => {
        const holderName = document.getElementById("new-holder-name").value.trim();
        const initialBalance = document.getElementById("new-initial-balance").value.trim();
        
        if (!holderName || !initialBalance || parseFloat(initialBalance) < 0) {
            displayResult("create-result", "⚠️ Please enter valid Account Holder Name and Initial Balance (≥ 0)!", true);
            return;
        }

        displayResult("create-result", "⏳ Creating account...", false);
        try {
            const newAccount = await API.create(holderName, initialBalance);
            displayResult("create-result", `✅ <strong>Account Created Successfully!</strong><br>Account ID: <strong>${newAccount.id}</strong><br>Holder: <strong>${newAccount.accountHolderName}</strong><br>Balance: <strong>₹${newAccount.balance.toFixed(2)}</strong>`);
            document.getElementById("new-holder-name").value = '';
            document.getElementById("new-initial-balance").value = '';
        } catch (error) {
            displayResult("create-result", `❌ Account creation failed. Please check the input.`, true);
        }
    });

    // ==========================================
    // 1. Get All Accounts
    // ==========================================
    document.getElementById("btn-get-all").addEventListener("click", async () => {
        displayResult("all-accounts-result", "⏳ Loading accounts...", false);
        try {
            const accounts = await API.getAll();
            if (!accounts || accounts.length === 0) {
                displayResult("all-accounts-result", "📭 No accounts found in the system.");
                return;
            }
            let htmlList = "<ul>";
            accounts.forEach((acc, index) => {
                htmlList += `<li><strong>#${index + 1}</strong> | ID: <strong>${acc.id}</strong> | Name: <strong>${acc.accountHolderName}</strong> | Balance: <strong>₹${acc.balance.toFixed(2)}</strong></li>`;
            });
            htmlList += "</ul>";
            displayResult("all-accounts-result", `✅ Found <strong>${accounts.length}</strong> account(s):<br>` + htmlList);
        } catch (error) {
            console.error('Error:', error);
            displayResult("all-accounts-result", "❌ Error fetching accounts. Please check backend connection.", true);
        }
    });

    // ==========================================
    // 2. Find Account by ID
    // ==========================================
    document.getElementById("btn-find").addEventListener("click", async () => {
        const id = document.getElementById("find-id").value.trim();
        if (!id) {
            displayResult("find-result", "⚠️ Please enter an Account ID!", true);
            return;
        }

        displayResult("find-result", "🔍 Searching...", false);
        try {
            const acc = await API.getById(id);
            const info = `✅ <strong>Account Found!</strong><br>ID: <strong>${acc.id}</strong><br>Balance: <strong>₹${acc.balance.toFixed(2)}</strong>`;
            displayResult("find-result", info);
            document.getElementById("find-id").value = '';
        } catch (error) {
            displayResult("find-result", `❌ Account not found for ID: <strong>${id}</strong>`, true);
        }
    });

    // ==========================================
    // 3. Deposit Money
    // ==========================================
    document.getElementById("btn-deposit").addEventListener("click", async () => {
        const id = document.getElementById("trans-id").value.trim();
        const amount = document.getElementById("trans-amount").value.trim();
        
        if (!id || !amount || parseFloat(amount) <= 0) {
            displayResult("trans-result", "⚠️ Please enter valid Account ID and Amount (> 0)!", true);
            return;
        }

        displayResult("trans-result", "💳 Processing deposit...", false);
        try {
            const acc = await API.deposit(id, amount);
            displayResult("trans-result", `✅ <strong>Deposit Successful!</strong><br>Amount: ₹${parseFloat(amount).toFixed(2)}<br>New Balance: <strong>₹${acc.balance.toFixed(2)}</strong>`);
            document.getElementById("trans-amount").value = '';
        } catch (error) {
            displayResult("trans-result", `❌ Deposit failed. Please check Account ID: <strong>${id}</strong>`, true);
        }
    });

    // ==========================================
    // 4. Withdraw Money
    // ==========================================
    document.getElementById("btn-withdraw").addEventListener("click", async () => {
        const id = document.getElementById("trans-id").value.trim();
        const amount = document.getElementById("trans-amount").value.trim();
        
        if (!id || !amount || parseFloat(amount) <= 0) {
            displayResult("trans-result", "⚠️ Please enter valid Account ID and Amount (> 0)!", true);
            return;
        }

        displayResult("trans-result", "💳 Processing withdrawal...", false);
        try {
            const acc = await API.withdraw(id, amount);
            displayResult("trans-result", `✅ <strong>Withdrawal Successful!</strong><br>Amount: ₹${parseFloat(amount).toFixed(2)}<br>Remaining Balance: <strong>₹${acc.balance.toFixed(2)}</strong>`);
            document.getElementById("trans-amount").value = '';
        } catch (error) {
            displayResult("trans-result", `❌ Withdrawal failed. Check balance or Account ID: <strong>${id}</strong>`, true);
        }
    });

    // ==========================================
    // 5. Delete Account
    // ==========================================
    document.getElementById("btn-delete").addEventListener("click", async () => {
        const id = document.getElementById("del-id").value.trim();
        if (!id) {
            displayResult("del-result", "⚠️ Please enter an Account ID!", true);
            return;
        }

        if (!confirm(`🗑️ Are you sure you want to delete account ID: ${id}? This action cannot be undone!`)) return;

        displayResult("del-result", "🔄 Deleting...", false);
        try {
            const responseMsg = await API.delete(id);
            displayResult("del-result", `✅ <strong>Account Deleted Successfully!</strong><br>Account ID: <strong>${id}</strong>`);
            document.getElementById("del-id").value = '';
        } catch (error) {
            displayResult("del-result", `❌ Failed to delete account ID: <strong>${id}</strong><br>This account may not exist.`, true);
        }
    });
});

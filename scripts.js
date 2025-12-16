// Enhanced Mock API System with Sequential Invoice Numbering and Status Tracking
const mockAPI = {
    // Enhanced Mock Data with Sequential Invoice Numbering
    users: [
        { username: 'patient', password: '123', role: 'patient', name: 'John Patient' },
        { username: 'billing', password: '123', role: 'billing', name: 'Sarah Billing' },
        { username: 'manager', password: '123', role: 'manager', name: 'Mike Manager' }
    ],
    
    patients: [
        { id: 1, name: 'John Doe', dob: '1985-03-15', phone: '555-0101', email: 'john.doe@email.com' },
        { id: 2, name: 'Jane Smith', dob: '1990-07-22', phone: '555-0102', email: 'jane.smith@email.com' },
        { id: 3, name: 'Robert Johnson', dob: '1978-12-03', phone: '555-0103', email: 'robert.johnson@email.com' },
        { id: 4, name: 'Emily Davis', dob: '1992-05-18', phone: '555-0104', email: 'emily.davis@email.com' },
        { id: 5, name: 'Michael Wilson', dob: '1988-09-11', phone: '555-0105', email: 'michael.wilson@email.com' }
    ],
    
    services: [
        { id: 1, name: 'General Consultation', cost: 150 },
        { id: 2, name: 'Blood Test', cost: 90 },
        { id: 3, name: 'X-Ray', cost: 250 },
        { id: 4, name: 'CT Scan', cost: 500 },
        { id: 5, name: 'Ultrasound', cost: 200 },
        { id: 6, name: 'MRI Scan', cost: 800 }
    ],
    
    // Enhanced service tracking with status (Unbilled → Billed → Paid)
    unbilledServices: [
        { id: 1, patientId: 1, serviceId: 1, date: '2024-01-15', cost: 150, status: 'Unbilled' },
        { id: 2, patientId: 1, serviceId: 2, date: '2024-01-15', cost: 90, status: 'Unbilled' },
        { id: 3, patientId: 2, serviceId: 3, date: '2024-01-16', cost: 250, status: 'Unbilled' },
        { id: 4, patientId: 3, serviceId: 1, date: '2024-01-17', cost: 150, status: 'Unbilled' },
        { id: 5, patientId: 4, serviceId: 4, date: '2024-01-18', cost: 500, status: 'Unbilled' },
        { id: 6, patientId: 5, serviceId: 6, date: '2024-01-19', cost: 800, status: 'Unbilled' }
    ],
    
    // Enhanced invoices with sequential numbering (INV-001, INV-002, etc.)
    invoices: [
        { id: 1, invoiceNumber: 'INV-001', patientId: 1, amount: 300, status: 'Paid', date: '2024-01-10', paymentDate: '2024-01-12', services: [1, 2] },
        { id: 2, invoiceNumber: 'INV-002', patientId: 1, amount: 150, status: 'Unpaid', date: '2024-01-20', services: [3] },
        { id: 3, invoiceNumber: 'INV-003', patientId: 2, amount: 400, status: 'Paid', date: '2024-01-15', paymentDate: '2024-01-16', services: [4, 5] },
        { id: 4, invoiceNumber: 'INV-004', patientId: 2, amount: 250, status: 'Unpaid', date: '2024-01-21', services: [6] },
        { id: 5, invoiceNumber: 'INV-005', patientId: 3, amount: 200, status: 'Paid', date: '2024-01-18', paymentDate: '2024-01-19', services: [7] }
    ],
    
    // Track next invoice number for sequential generation
    nextInvoiceNumber: 6,
    
    analyticsData: {
        peakHours: [
            { hour: '8:00 AM', visits: 12, utilization: 60 },
            { hour: '9:00 AM', visits: 18, utilization: 90 },
            { hour: '10:00 AM', visits: 15, utilization: 75 },
            { hour: '11:00 AM', visits: 20, utilization: 100 },
            { hour: '12:00 PM', visits: 8, utilization: 40 },
            { hour: '1:00 PM', visits: 5, utilization: 25 },
            { hour: '2:00 PM', visits: 14, utilization: 70 },
            { hour: '3:00 PM', visits: 16, utilization: 80 },
            { hour: '4:00 PM', visits: 11, utilization: 55 },
            { hour: '5:00 PM', visits: 9, utilization: 45 }
        ],
        totalPatients: 128,
        dailyAverage: 12.8,
        lastRefresh: new Date().toISOString()
    },

    // Mock API Functions (all async with promises)
    login(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.users.find(u => u.username === username && u.password === password);
                if (user) {
                    resolve({ ...user });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 500);
        });
    },

    searchPatient(name) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const results = this.patients.filter(p =>
                    p.name.toLowerCase().includes(name.toLowerCase())
                );
                resolve(results);
            }, 300);
        });
    },

    getUnbilledServices(patientId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const services = this.unbilledServices
                    .filter(us => us.patientId === patientId)
                    .map(us => ({
                        id: us.id,
                        serviceId: us.serviceId,
                        serviceName: this.services.find(s => s.id === us.serviceId)?.name || 'Unknown Service',
                        date: us.date,
                        cost: us.cost
                    }));
                resolve(services);
            }, 200);
        });
    },

    generateInvoice(patientId, serviceIds) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const services = this.unbilledServices.filter(us => serviceIds.includes(us.id));
                const totalAmount = services.reduce((sum, service) => sum + service.cost, 0);

                const newInvoiceNumber = `INV-${String(this.nextInvoiceNumber).padStart(3, '0')}`;
                const newInvoice = {
                    id: this.nextInvoiceNumber,
                    invoiceNumber: newInvoiceNumber,
                    patientId: patientId,
                    amount: totalAmount,
                    status: 'Billed',
                    date: new Date().toISOString().split('T')[0],
                    services: [...serviceIds]
                };

                this.invoices.push(newInvoice);

                // Update service status and remove billed ones
                this.unbilledServices = this.unbilledServices
                    .map(us => (serviceIds.includes(us.id) ? { ...us, status: 'Billed' } : us))
                    .filter(us => !serviceIds.includes(us.id));

                this.nextInvoiceNumber++;

                resolve(newInvoice);
            }, 1000);
        });
    },

    getInvoicesForPatient(patientId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const invoices = this.invoices.filter(inv => inv.patientId === patientId);
                resolve(invoices);
            }, 200);
        });
    },

    // Enhanced Analytics Data with refresh capability
    getAnalyticsData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const lastRefresh = this.analyticsData.lastRefresh;
                resolve({
                    ...this.analyticsData,
                    lastRefresh: lastRefresh
                });
            }, 300);
        });
    },

    // Simulate 24-hour data refresh
    refreshAnalyticsData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.analyticsData.peakHours = this.analyticsData.peakHours.map(hour => ({
                    ...hour,
                    visits: Math.floor(Math.random() * 5) + hour.visits - 2
                }));
                this.analyticsData.lastRefresh = new Date().toISOString();
                resolve(this.analyticsData);
            }, 1000);
        });
    },

    // Enhanced Payment Gateway Simulation
    processPayment(invoiceId, paymentDetails) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const invoice = this.invoices.find(inv => inv.id === invoiceId);
                if (!invoice) {
                    reject(new Error('Invoice not found'));
                    return;
                }

                if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
                    reject(new Error('Invalid payment details'));
                    return;
                }

                const success = Math.random() > 0.05;

                if (success) {
                    invoice.status = 'Paid';
                    invoice.paymentDate = new Date().toISOString().split('T')[0];
                    invoice.paymentDetails = {
                        cardLast4: paymentDetails.cardNumber.slice(-4),
                        cardholderName: paymentDetails.cardholderName,
                        transactionId: 'TXN-' + Date.now(),
                        timestamp: paymentDetails.timestamp
                    };

                    resolve({
                        success: true,
                        invoice: invoice,
                        message: 'Payment processed successfully'
                    });
                } else {
                    reject(new Error('Payment gateway error: Transaction declined'));
                }
            }, 1500);
        });
    }
};

// Enhanced Application State
const appState = {
    currentUser: null,
    selectedPatient: null,
    selectedServices: [],
    currentInvoiceId: null,
    currentInvoiceNumber: null,
    lastGeneratedInvoice: null
};

// Utility Functions
function showElement(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
}

function hideElement(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
}

function showLoading() {
    showElement('loadingSpinner');
}

function hideLoading() {
    hideElement('loadingSpinner');
}

function showModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('hidden');
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('hidden');
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Authentication Functions
async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username')?.value;
    const password = document.getElementById('password')?.value;

    try {
        showLoading();
        const user = await mockAPI.login(username, password);

        appState.currentUser = user;

        hideElement('loginSection');
        showElement('mainApp');
        showElement('userInfo');

        const currentUserSpan = document.getElementById('currentUser');
        if (currentUserSpan) {
            currentUserSpan.textContent = `${user.name} (${user.role})`;
        }

        showUserPortal(user.role);
    } catch (error) {
        alert('Login failed: ' + error.message);
    } finally {
        hideLoading();
    }
}

function logout() {
    appState.currentUser = null;
    appState.selectedPatient = null;
    appState.selectedServices = [];

    showElement('loginSection');
    hideElement('mainApp');
    hideElement('userInfo');

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    if (usernameInput) usernameInput.value = '';
    if (passwordInput) passwordInput.value = '';

    hideElement('billingPortal');
    hideElement('managerPortal');
    hideElement('patientPortal');
}

function showUserPortal(role) {
    hideElement('billingPortal');
    hideElement('managerPortal');
    hideElement('patientPortal');

    switch (role) {
        case 'billing':
            showElement('billingPortal');
            break;
        case 'manager':
            showElement('managerPortal');
            loadManagerDashboard();
            break;
        case 'patient':
            showElement('patientPortal');
            loadPatientPortal();
            break;
    }
}

// Billing Staff Portal Functions
async function searchPatient() {
    const input = document.getElementById('patientSearch');
    const searchTerm = input ? input.value : '';

    if (!searchTerm.trim()) {
        alert('Please enter a patient name to search');
        return;
    }

    try {
        showLoading();
        const results = await mockAPI.searchPatient(searchTerm);

        if (results.length === 0) {
            const list = document.getElementById('patientList');
            if (list) list.innerHTML = '<p class="text-gray-500">No patients found</p>';
        } else {
            displayPatientResults(results);
        }

        showElement('searchResults');
    } catch (error) {
        alert('Search failed: ' + error.message);
    } finally {
        hideLoading();
    }
}

function displayPatientResults(patients) {
    const container = document.getElementById('patientList');
    if (!container) return;

    container.innerHTML = patients.map(patient => `
        <div class="bg-gray-50 p-4 rounded-lg border">
            <div class="flex justify-between items-center">
                <div>
                    <h4 class="font-semibold text-lg">${patient.name}</h4>
                    <p class="text-gray-600">DOB: ${patient.dob} | Phone: ${patient.phone}</p>
                    <p class="text-gray-600">Email: ${patient.email}</p>
                </div>
                <button onclick="selectPatient(${patient.id})" 
                        class="bg-healthcare-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Select Patient
                </button>
            </div>
        </div>
    `).join('');
}

async function selectPatient(patientId) {
    try {
        showLoading();
        appState.selectedPatient = mockAPI.patients.find(p => p.id === patientId) || null;
        const unbilledServices = await mockAPI.getUnbilledServices(patientId);

        displayUnbilledServices(unbilledServices);
        showElement('unbilledServices');
    } catch (error) {
        alert('Failed to load patient services: ' + error.message);
    } finally {
        hideLoading();
    }
}

function displayUnbilledServices(services) {
    const container = document.getElementById('servicesList');
    const totalAmountSpan = document.getElementById('totalAmount');
    if (!container || !totalAmountSpan) return;

    if (services.length === 0) {
        container.innerHTML = '<p class="text-gray-500">No unbilled services found for this patient.</p>';
        totalAmountSpan.textContent = '0';
        return;
    }

    appState.selectedServices = [];

    container.innerHTML = services.map(service => `
        <div class="bg-gray-50 p-4 rounded-lg border">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input type="checkbox" id="service-${service.id}" 
                           onchange="updateServiceSelection(${service.id}, '${service.serviceName}', ${service.cost})"
                           class="mr-3 h-4 w-4 text-healthcare-primary focus:ring-healthcare-primary border-gray-300 rounded">
                    <div>
                        <h4 class="font-semibold">${service.serviceName}</h4>
                        <p class="text-gray-600">Date: ${service.date}</p>
                    </div>
                </div>
                <div class="text-lg font-semibold">${formatCurrency(service.cost)}</div>
            </div>
        </div>
    `).join('');
}

function updateServiceSelection(serviceId, serviceName, cost) {
    const checkbox = document.getElementById(`service-${serviceId}`);
    if (!checkbox) return;

    const existingIndex = appState.selectedServices.findIndex(s => s.id === serviceId);

    if (checkbox.checked) {
        if (existingIndex === -1) {
            appState.selectedServices.push({ id: serviceId, name: serviceName, cost: cost });
        }
    } else {
        if (existingIndex !== -1) {
            appState.selectedServices.splice(existingIndex, 1);
        }
    }

    updateTotal();
}

function updateTotal() {
    const totalElement = document.getElementById('totalAmount');
    if (!totalElement) return;

    const total = appState.selectedServices.reduce((sum, service) => sum + service.cost, 0);
    totalElement.textContent = String(total);
}

async function generateInvoice() {
    if (appState.selectedServices.length === 0) {
        alert('Please select at least one service to generate an invoice.');
        return;
    }

    if (!appState.selectedPatient) {
        alert('No patient selected.');
        return;
    }

    const serviceIds = appState.selectedServices.map(s => s.id);

    try {
        showLoading();
        const invoice = await mockAPI.generateInvoice(appState.selectedPatient.id, serviceIds);

        const invNumEl = document.getElementById('generatedInvoiceNumber');
        const patIdEl = document.getElementById('generatedPatientId');
        const amtEl = document.getElementById('generatedAmount');
        if (invNumEl) invNumEl.textContent = invoice.invoiceNumber;
        if (patIdEl) patIdEl.textContent = appState.selectedPatient.id;
        if (amtEl) amtEl.textContent = formatCurrency(invoice.amount);
        showModal('invoiceModal');

        const searchInput = document.getElementById('patientSearch');
        if (searchInput) searchInput.value = '';
        hideElement('searchResults');
        hideElement('unbilledServices');
        appState.selectedServices = [];
        appState.selectedPatient = null;

        appState.lastGeneratedInvoice = invoice;
    } catch (error) {
        alert('Failed to generate invoice: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Hospital Manager Portal Functions
async function loadManagerDashboard() {
    try {
        showLoading();

        if (!appState.currentUser || appState.currentUser.role !== 'manager') {
            alert('Access denied: This section is restricted to Hospital Managers only.');
            logout();
            return;
        }

        const data = await mockAPI.getAnalyticsData();

        const roleSpan = document.getElementById('currentUserRole');
        if (roleSpan) roleSpan.textContent = appState.currentUser.role;

        const totalPatientsEl = document.getElementById('totalPatients');
        if (totalPatientsEl) totalPatientsEl.textContent = data.totalPatients;

        const peakHourData = data.peakHours.reduce(
            (max, current) => (current.visits > max.visits ? current : max),
            data.peakHours[0]
        );

        const peakHourEl = document.getElementById('peakHour');
        const avgEl = document.getElementById('dailyAverage');
        if (peakHourEl) peakHourEl.textContent = peakHourData.hour;
        if (avgEl) avgEl.textContent = data.dailyAverage.toFixed(1);

        const lastRefreshEl = document.getElementById('lastRefreshTime');
        if (lastRefreshEl) lastRefreshEl.textContent = formatDateTime(data.lastRefresh);

        createAnalyticsChart(data.peakHours);
        populateAnalyticsTable(data.peakHours);
    } catch (error) {
        alert('Failed to load analytics data: ' + error.message);
    } finally {
        hideLoading();
    }
}

let analyticsChartInstance = null;
function createAnalyticsChart(peakHoursData) {
    const canvas = document.getElementById('analyticsChart');
    if (!canvas || typeof Chart === 'undefined') return;
    const ctx = canvas.getContext('2d');

    if (analyticsChartInstance) {
        analyticsChartInstance.destroy();
    }

    analyticsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: peakHoursData.map(d => d.hour),
            datasets: [
                {
                    label: 'Patient Visits',
                    data: peakHoursData.map(d => d.visits),
                    backgroundColor: 'rgba(14, 165, 233, 0.8)',
                    borderColor: 'rgba(14, 165, 233, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Utilization %',
                    data: peakHoursData.map(d => d.utilization),
                    backgroundColor: 'rgba(20, 184, 166, 0.8)',
                    borderColor: 'rgba(20, 184, 166, 1)',
                    borderWidth: 1,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Visits'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Utilization %'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Hospital Peak Hours Analysis'
                }
            }
        }
    });
}

function populateAnalyticsTable(peakHoursData) {
    const tbody = document.getElementById('analyticsTableBody');
    if (!tbody) return;

    tbody.innerHTML = peakHoursData.map(data => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${data.hour}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${data.visits}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${data.utilization}%</td>
        </tr>
    `).join('');
}

// Patient Portal Functions
async function loadPatientPortal() {
    try {
        showLoading();

        const welcomeDiv = document.getElementById('patientWelcome');
        if (welcomeDiv && appState.currentUser) {
            welcomeDiv.innerHTML = `
                <div class="bg-healthcare-secondary text-white p-6 rounded-lg">
                    <h3 class="text-xl font-bold">Welcome, ${appState.currentUser.name}!</h3>
                    <p class="mt-2">Here you can view and pay your medical invoices.</p>
                </div>
            `;
        }

        const invoices = await mockAPI.getInvoicesForPatient(1); // demo patient
        displayPatientInvoices(invoices);
    } catch (error) {
        alert('Failed to load patient portal: ' + error.message);
    } finally {
        hideLoading();
    }
}

function displayPatientInvoices(invoices) {
    const tbody = document.getElementById('patientInvoices');
    if (!tbody) return;

    if (invoices.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="px-6 py-4 text-center text-gray-500">No invoices found</td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = invoices.map(invoice => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${invoice.invoiceNumber}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatCurrency(invoice.amount)}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full status-${invoice.status.toLowerCase()}">
                    ${invoice.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${
                    invoice.status === 'Billed' || invoice.status === 'Unpaid'
                        ? `<button onclick="openPaymentModal(${invoice.id}, ${invoice.amount}, '${invoice.invoiceNumber}')"
                                   class="bg-healthcare-accent text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                               Pay Now
                           </button>`
                        : `<span class="text-green-600">Paid on ${formatDate(invoice.paymentDate)}</span>`
                }
            </td>
        </tr>
    `).join('');
}

function openPaymentModal(invoiceId, amount, invoiceNumber) {
    appState.currentInvoiceId = invoiceId;
    appState.currentInvoiceNumber = invoiceNumber;

    const idEl = document.getElementById('paymentInvoiceId');
    const amtEl = document.getElementById('paymentAmount');
    if (idEl) idEl.textContent = invoiceNumber;
    if (amtEl) amtEl.textContent = formatCurrency(amount);

    showModal('paymentModal');
}

// Invoice Printing
function printInvoice() {
    if (!appState.lastGeneratedInvoice) {
        alert('No invoice available for printing');
        return;
    }

    const invoice = appState.lastGeneratedInvoice;
    const printWindow = window.open('', '_blank');

    if (!printWindow) {
        alert('Unable to open print window. Please allow popups.');
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice ${invoice.invoiceNumber}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; border-bottom: 2px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 30px; }
                .invoice-details { margin: 20px 0; }
                .invoice-number { font-size: 24px; font-weight: bold; color: #0ea5e9; }
                .total { font-size: 18px; font-weight: bold; text-align: right; margin: 20px 0; }
                .footer { text-align: center; margin-top: 40px; color: #666; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>MedCare Hospital</h1>
                <div class="invoice-number">Invoice ${invoice.invoiceNumber}</div>
                <div>Date: ${formatDate(invoice.date)}</div>
            </div>
            
            <div class="invoice-details">
                <h3>Services</h3>
                <p>Patient ID: ${invoice.patientId}</p>
                <p>Total Amount: ${formatCurrency(invoice.amount)}</p>
                <p>Status: ${invoice.status}</p>
            </div>
            
            <div class="footer">
                <p>Thank you for choosing MedCare Hospital</p>
            </div>
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
}

// Manager Dashboard Data Refresh
async function refreshAnalyticsData() {
    try {
        showLoading();
        const updatedData = await mockAPI.refreshAnalyticsData();

        const totalPatientsEl = document.getElementById('totalPatients');
        const peakHourEl = document.getElementById('peakHour');
        const avgEl = document.getElementById('dailyAverage');
        const lastRefreshEl = document.getElementById('lastRefreshTime');

        if (totalPatientsEl) totalPatientsEl.textContent = updatedData.totalPatients;
        const peakHourData = updatedData.peakHours.reduce(
            (max, current) => (current.visits > max.visits ? current : max),
            updatedData.peakHours[0]
        );
        if (peakHourEl) peakHourEl.textContent = peakHourData.hour;
        if (avgEl) avgEl.textContent = updatedData.dailyAverage.toFixed(1);
        if (lastRefreshEl) lastRefreshEl.textContent = formatDateTime(updatedData.lastRefresh);

        createAnalyticsChart(updatedData.peakHours);
        populateAnalyticsTable(updatedData.peakHours);

        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-healthcare-accent text-white p-4 rounded-lg shadow-lg z-50';
        notification.textContent = 'Analytics data refreshed successfully!';
        document.body.appendChild(notification);
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    } catch (error) {
        alert('Failed to refresh analytics data: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Payment Processing
async function processPayment(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('cardNumber')?.value;
    const expiryDate = document.getElementById('expiryDate')?.value;
    const cvv = document.getElementById('cvv')?.value;
    const cardholderName = document.getElementById('cardholderName')?.value;

    const paymentDetails = {
        cardNumber,
        expiryDate,
        cvv,
        cardholderName,
        timestamp: new Date().toISOString()
    };

    try {
        showLoading();
        closeModal('paymentModal');

        const result = await mockAPI.processPayment(appState.currentInvoiceId, paymentDetails);

        if (result.success) {
            const invNumEl = document.getElementById('paymentSuccessInvoiceNumber');
            const amtEl = document.getElementById('paymentSuccessAmount');
            if (invNumEl) {
                invNumEl.textContent =
                    appState.currentInvoiceNumber || `INV-${String(appState.currentInvoiceId).padStart(3, '0')}`;
            }
            if (amtEl) {
                amtEl.textContent = formatCurrency(result.invoice.amount);
            }

            showModal('paymentSuccessModal');
            await loadPatientPortal();
        }
    } catch (error) {
        alert('Payment failed: ' + error.message);
    } finally {
        hideLoading();

        const cardNumberInput = document.getElementById('cardNumber');
        const expiryInput = document.getElementById('expiryDate');
        const cvvInput = document.getElementById('cvv');
        const nameInput = document.getElementById('cardholderName');
        if (cardNumberInput) cardNumberInput.value = '';
        if (expiryInput) expiryInput.value = '';
        if (cvvInput) cvvInput.value = '';
        if (nameInput) nameInput.value = '';

        appState.currentInvoiceId = null;
        appState.currentInvoiceNumber = null;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    hideElement('mainApp');
    hideElement('userInfo');
});
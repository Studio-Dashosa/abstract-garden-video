// Deliverable Upload System
class DeliverableSystem {
    constructor() {
        this.deliverables = this.loadDeliverables();
    }

    loadDeliverables() {
        const stored = localStorage.getItem('abstract_garden_deliverables');
        return stored ? JSON.parse(stored) : {};
    }

    saveDeliverables() {
        localStorage.setItem('abstract_garden_deliverables', JSON.stringify(this.deliverables));
    }

    uploadDeliverable(issueNumber, file, description) {
        if (!this.deliverables[issueNumber]) {
            this.deliverables[issueNumber] = [];
        }

        const deliverable = {
            id: Date.now(),
            filename: file.name,
            size: file.size,
            type: file.type,
            description: description,
            uploadDate: new Date().toISOString(),
            url: null // Will be set after upload
        };

        // For now, store as base64 (in production, upload to GitHub or cloud storage)
        const reader = new FileReader();
        reader.onload = (e) => {
            deliverable.data = e.target.result;
            this.deliverables[issueNumber].push(deliverable);
            this.saveDeliverables();
            this.refreshDeliverableUI(issueNumber);
        };
        reader.readAsDataURL(file);

        return deliverable;
    }

    getDeliverables(issueNumber) {
        return this.deliverables[issueNumber] || [];
    }

    deleteDeliverable(issueNumber, deliverableId) {
        if (this.deliverables[issueNumber]) {
            this.deliverables[issueNumber] = this.deliverables[issueNumber].filter(
                d => d.id !== deliverableId
            );
            this.saveDeliverables();
            this.refreshDeliverableUI(issueNumber);
        }
    }

    refreshDeliverableUI(issueNumber) {
        // Trigger UI update for this issue's deliverables
        const event = new CustomEvent('deliverablesUpdated', {
            detail: { issueNumber, deliverables: this.getDeliverables(issueNumber) }
        });
        window.dispatchEvent(event);
    }

    getTotalDeliverables() {
        return Object.values(this.deliverables).flat().length;
    }

    getDeliverableStats() {
        const total = this.getTotalDeliverables();
        const byType = {};
        
        Object.values(this.deliverables).flat().forEach(deliverable => {
            const type = this.getFileCategory(deliverable.type);
            byType[type] = (byType[type] || 0) + 1;
        });

        return { total, byType };
    }

    getFileCategory(mimeType) {
        if (mimeType.startsWith('image/')) return 'Images';
        if (mimeType.startsWith('video/')) return 'Videos';
        if (mimeType.startsWith('audio/')) return 'Audio';
        if (mimeType.includes('pdf')) return 'PDFs';
        if (mimeType.includes('zip') || mimeType.includes('rar')) return 'Archives';
        return 'Other';
    }
}

// Initialize global deliverable system
window.deliverableSystem = new DeliverableSystem();

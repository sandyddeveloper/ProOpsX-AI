

## **ER Diagram Description**

### **1. User & Roles**

* **User** (1) ⬌ (1) **EmployeeProfile**
* **User** has a **role** (enum: DEVELOPER, HR, MANAGER, ADMIN)
* **User** participates in **Projects**, **Tasks**, **Bugs**, **Attendance**, **LeaveRequest**, **Payroll**, **ChatMessages**, **TimeLogs**, **Notifications**.

---

### **2. Projects & Tasks**

* **Project** (1) ⬌ (M) **Task**
* **Project** (M) ⬌ (M) **User** via `teamMembers` (Many-to-Many)
* **Task** (M) ⬌ (M) **Attachment**
* **Task** can have a **parentTask** (self-referencing) for sub-tasks
* **Task** assigned to **User** (Many-to-One)

---

### **3. Bug Tracking**

* **Bug** (M) ⬌ (1) **Project**
* **Bug** (M) ⬌ (1) **User** as `reportedBy`
* **Bug** (M) ⬌ (1) **User** as `assignedTo`
* **Bug** (1) ⬌ (M) **BugComment**
* **BugComment** ⬌ **User** as `commentedBy`

---

### **4. Communication**

* **ChatMessage** (M) ⬌ (1) **User** as `sender`
* **ChatMessage** (M) ⬌ (1) **User** as `receiver`

---

### **5. Time & Productivity**

* **TimeLog** (M) ⬌ (1) **User**
* **TimeLog** (M) ⬌ (1) **Task**

---

### **6. Notifications**

* **Notification** (M) ⬌ (1) **User**

---

### **7. HR Features**

* **EmployeeProfile** (1) ⬌ (1) **User**
* **Attendance** (M) ⬌ (1) **User**
* **LeaveRequest** (M) ⬌ (1) **User**
* **Payroll** (M) ⬌ (1) **User**

---

### **8. Relationships Summary**

| Entity 1     | Relationship | Entity 2              |
| ------------ | ------------ | --------------------- |
| User         | 1:1          | EmployeeProfile       |
| User         | M:N          | Project (teamMembers) |
| Project      | 1:M          | Task                  |
| Task         | 1:M          | Attachment            |
| Task         | M:1          | User (assignedTo)     |
| Task         | 0:1          | Task (parentTask)     |
| Bug          | M:1          | Project               |
| Bug          | M:1          | User (reportedBy)     |
| Bug          | M:1          | User (assignedTo)     |
| Bug          | 1:M          | BugComment            |
| BugComment   | M:1          | User (commentedBy)    |
| ChatMessage  | M:1          | User (sender)         |
| ChatMessage  | M:1          | User (receiver)       |
| TimeLog      | M:1          | User                  |
| TimeLog      | M:1          | Task                  |
| Notification | M:1          | User                  |
| Attendance   | M:1          | User                  |
| LeaveRequest | M:1          | User                  |
| Payroll      | M:1          | User                  |

---


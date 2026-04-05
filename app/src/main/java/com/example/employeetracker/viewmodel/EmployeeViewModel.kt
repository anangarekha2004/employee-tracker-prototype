package com.example.employeetracker.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.employeetracker.data.EmployeeDao
import com.example.employeetracker.model.Attendance
import com.example.employeetracker.model.Employee
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import java.util.Calendar

class EmployeeViewModel(private val dao: EmployeeDao) : ViewModel() {

    val employees: StateFlow<List<Employee>> = dao.getAllEmployees()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val attendanceRecords: StateFlow<List<Attendance>> = dao.getAllAttendance()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    fun addEmployee(employee: Employee) {
        viewModelScope.launch { dao.insertEmployee(employee) }
    }

    fun deleteEmployee(employee: Employee) {
        viewModelScope.launch { dao.deleteEmployee(employee) }
    }

    fun markAttendance(employeeId: Int, status: String) {
        val calendar = Calendar.getInstance().apply {
            set(Calendar.HOUR_OF_DAY, 0)
            set(Calendar.MINUTE, 0)
            set(Calendar.SECOND, 0)
            set(Calendar.MILLISECOND, 0)
        }
        val today = calendar.timeInMillis

        viewModelScope.launch {
            val existing = dao.getAttendanceForDate(employeeId, today)
            if (existing != null) {
                dao.insertAttendance(existing.copy(status = status))
            } else {
                dao.insertAttendance(Attendance(employeeId = employeeId, date = today, status = status))
            }
        }
    }
}

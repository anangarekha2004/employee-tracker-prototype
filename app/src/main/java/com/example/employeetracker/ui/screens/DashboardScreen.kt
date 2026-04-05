package com.example.employeetracker.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.employeetracker.viewmodel.EmployeeViewModel

@Composable
fun DashboardScreen(viewModel: EmployeeViewModel) {
    val employees by viewModel.employees.collectAsState()
    val attendance by viewModel.attendanceRecords.collectAsState()

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text("Dashboard", style = MaterialTheme.typography.headlineMedium)
        Spacer(modifier = Modifier.height(16.dp))
        
        Card(modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp)) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Total Employees", style = MaterialTheme.typography.titleMedium)
                Text("${employees.size}", style = MaterialTheme.typography.headlineLarge)
            }
        }

        Card(modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp)) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Attendance Today", style = MaterialTheme.typography.titleMedium)
                val presentCount = attendance.filter { it.status == "PRESENT" }.size
                Text("$presentCount / ${employees.size}", style = MaterialTheme.typography.headlineLarge)
            }
        }
    }
}

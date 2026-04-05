package com.example.employeetracker.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ProfileScreen() {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text("Admin Profile", style = MaterialTheme.typography.headlineMedium)
        Spacer(modifier = Modifier.height(16.dp))
        
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Name: Admin User", style = MaterialTheme.typography.titleMedium)
                Text("Role: System Administrator", style = MaterialTheme.typography.bodyMedium)
                Text("Access Level: Super Admin", style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}

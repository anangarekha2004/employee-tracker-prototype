package com.example.employeetracker.ui

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.room.Room
import com.example.employeetracker.data.AppDatabase
import com.example.employeetracker.ui.screens.*
import com.example.employeetracker.viewmodel.EmployeeViewModel
import com.example.employeetracker.viewmodel.ViewModelFactory

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        val db = Room.databaseBuilder(
            applicationContext,
            AppDatabase::class.java, "employee-db"
        ).build()

        setContent {
            MaterialTheme {
                val navController = rememberNavController()
                val viewModel: EmployeeViewModel = viewModel(factory = ViewModelFactory(db.employeeDao()))
                
                Scaffold(
                    bottomBar = { BottomNavigationBar(navController) }
                ) { innerPadding ->
                    NavHost(
                        navController = navController,
                        startDestination = "dashboard",
                        modifier = Modifier.padding(innerPadding)
                    ) {
                        composable("dashboard") { DashboardScreen(viewModel) }
                        composable("employees") { EmployeeListScreen(viewModel) }
                        composable("attendance") { AttendanceScreen(viewModel) }
                        composable("profile") { ProfileScreen() }
                    }
                }
            }
        }
    }
}

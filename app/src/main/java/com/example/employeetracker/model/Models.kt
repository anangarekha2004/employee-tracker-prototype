package com.example.employeetracker.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.util.Date

@Entity(tableName = "employees")
data class Employee(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val name: String,
    val role: String,
    val department: String,
    val salary: Double,
    val joiningDate: Long, // Timestamp
    val rating: Int,
    val notes: String
)

@Entity(tableName = "attendance")
data class Attendance(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val employeeId: Int,
    val date: Long, // Timestamp for the day
    val status: String // "PRESENT" or "ABSENT"
)

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS skill_swap;
USE skill_swap;

-- USERS table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    profile_photo VARCHAR(255),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_public BOOLEAN DEFAULT TRUE,
    roles VARCHAR(100) DEFAULT 'user',
    banned BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- SKILLS table
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    tags VARCHAR(255),
    approved BOOLEAN DEFAULT FALSE
);

-- USER_SKILLS_OFFERED (many-to-many)
CREATE TABLE IF NOT EXISTS user_skills_offered (
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- USER_SKILLS_WANTED (many-to-many)
CREATE TABLE IF NOT EXISTS user_skills_wanted (
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- SWAPS table
CREATE TABLE IF NOT EXISTS swaps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    requester_id INT NOT NULL,
    responder_id INT NOT NULL,
    skill_offered_id INT NOT NULL,
    skill_wanted_id INT NOT NULL,
    status ENUM('pending', 'accepted', 'rejected', 'cancelled') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (responder_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_offered_id) REFERENCES skills(id),
    FOREIGN KEY (skill_wanted_id) REFERENCES skills(id)
);

-- FEEDBACKS table
CREATE TABLE IF NOT EXISTS feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    swap_id INT NOT NULL,
    from_user INT NOT NULL,
    to_user INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (swap_id) REFERENCES swaps(id) ON DELETE CASCADE,
    FOREIGN KEY (from_user) REFERENCES users(id),
    FOREIGN KEY (to_user) REFERENCES users(id)
);

-- ADMIN_ACTIONS table
CREATE TABLE IF NOT EXISTS admin_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    target_user INT,
    target_skill INT,
    reason TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES users(id),
    FOREIGN KEY (target_user) REFERENCES users(id),
    FOREIGN KEY (target_skill) REFERENCES skills(id)
);

-- MESSAGES table
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    recipients TEXT, -- Comma-separated user IDs or 'all'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME
);

-- REPORTS table
CREATE TABLE IF NOT EXISTS reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_type VARCHAR(100) NOT NULL,
    generated_by INT,
    file_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (generated_by) REFERENCES users(id)
);

-- INDEXES for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_skills_name ON skills(name);
CREATE INDEX idx_swaps_status ON swaps(status);
CREATE INDEX idx_swaps_requester ON swaps(requester_id);
CREATE INDEX idx_swaps_responder ON swaps(responder_id);
CREATE INDEX idx_feedbacks_to_user ON feedbacks(to_user);
CREATE INDEX idx_admin_actions_type ON admin_actions(action_type);
CREATE INDEX idx_admin_actions_target_user ON admin_actions(target_user);

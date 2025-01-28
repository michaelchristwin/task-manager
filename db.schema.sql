-- Connect to the database
\c task_manager_db

-- Check if the tasks and users tables exist before creating them
DO $$
BEGIN
    -- Check if the tasks table exists
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'tasks'
    ) THEN
        -- Create tasks table
        CREATE TABLE tasks (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            due_date TIMESTAMP WITH TIME ZONE,
            priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high')),
            completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        -- Create index for common queries on tasks table
        CREATE INDEX idx_tasks_due_date ON tasks(due_date);
        CREATE INDEX idx_tasks_priority ON tasks(priority);
        CREATE INDEX idx_tasks_completed ON tasks(completed);

        -- Add comments to the tasks table
        COMMENT ON TABLE tasks IS 'Stores task information for the task manager application';
        COMMENT ON COLUMN tasks.id IS 'Unique identifier for the task';
        COMMENT ON COLUMN tasks.priority IS 'Task priority level (low, medium, high)';

        RAISE NOTICE 'Tasks table created successfully.';
    ELSE
        RAISE NOTICE 'Tasks table already exists. Skipping creation.';
    END IF;

    -- Check if the users table exists
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'users'
    ) THEN
        -- Create users table
        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        -- Create index for common queries on users table
        CREATE INDEX idx_users_email ON users(email);
       

        -- Add comments to the users table
        COMMENT ON TABLE users IS 'Stores user information for the task manager application';
        COMMENT ON COLUMN users.id IS 'Unique identifier for the user';
        COMMENT ON COLUMN users.email IS 'Email address of the user (must be unique)';

        RAISE NOTICE 'Users table created successfully.';
    ELSE
        RAISE NOTICE 'Users table already exists. Skipping creation.';
    END IF;

    -- Create function to automatically update the updated_at timestamp
    CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$ language 'plpgsql';

    -- Create trigger to automatically update the updated_at timestamp for tasks table
    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'update_tasks_modtime'
    ) THEN
        CREATE TRIGGER update_tasks_modtime
            BEFORE UPDATE ON tasks
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;

    -- Create trigger to automatically update the updated_at timestamp for users table
    IF NOT EXISTS (
        SELECT 1
        FROM pg_trigger
        WHERE tgname = 'update_users_modtime'
    ) THEN
        CREATE TRIGGER update_users_modtime
            BEFORE UPDATE ON users
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;
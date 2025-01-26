-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text check (role in ('admin', 'doctor', 'patient')) not null default 'patient',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table public.profiles enable row level security;

-- Doctors table
create table public.doctors (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  specialty text not null,
  license_number text unique not null,
  status text check (status in ('active', 'inactive', 'pending')) not null default 'pending',
  department_id uuid references public.departments(id),
  consultation_fee decimal(10,2) not null default 0.00,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.doctors enable row level security;

-- Departments table
create table public.departments (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  description text,
  head_doctor_id uuid references public.doctors(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.departments enable row level security;

-- Appointments table
create table public.appointments (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references public.profiles(id) not null,
  doctor_id uuid references public.doctors(id) not null,
  appointment_date timestamp with time zone not null,
  status text check (status in ('scheduled', 'completed', 'cancelled', 'no-show')) not null default 'scheduled',
  type text check (type in ('regular', 'follow-up', 'emergency')) not null default 'regular',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.appointments enable row level security;

-- Payments table
create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  appointment_id uuid references public.appointments(id) not null,
  amount decimal(10,2) not null,
  status text check (status in ('pending', 'completed', 'failed', 'refunded')) not null default 'pending',
  payment_method text check (payment_method in ('cash', 'card', 'insurance')) not null,
  transaction_id text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.payments enable row level security;

-- Notifications table
create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) not null,
  title text not null,
  message text not null,
  type text check (type in ('appointment', 'payment', 'system')) not null,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.notifications enable row level security;

-- Create RLS policies
-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Doctors policies
create policy "Doctors are viewable by everyone"
  on public.doctors for select
  using ( true );

create policy "Admins can manage doctors"
  on public.doctors for all
  using ( exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  ));

-- Appointments policies
create policy "Users can view their own appointments"
  on public.appointments for select
  using (
    auth.uid() = patient_id
    or exists (
      select 1 from public.doctors
      where doctors.id = appointments.doctor_id
      and doctors.user_id = auth.uid()
    )
  );

create policy "Users can insert their own appointments"
  on public.appointments for insert
  with check ( auth.uid() = patient_id );

-- Payments policies
create policy "Users can view their own payments"
  on public.payments for select
  using (
    exists (
      select 1 from public.appointments
      where appointments.id = payments.appointment_id
      and (
        appointments.patient_id = auth.uid()
        or exists (
          select 1 from public.doctors
          where doctors.id = appointments.doctor_id
          and doctors.user_id = auth.uid()
        )
      )
    )
  );

-- Notifications policies
create policy "Users can view their own notifications"
  on public.notifications for select
  using ( auth.uid() = user_id );

-- Create indexes for better performance
create index doctors_user_id_idx on public.doctors(user_id);
create index doctors_department_id_idx on public.doctors(department_id);
create index appointments_patient_id_idx on public.appointments(patient_id);
create index appointments_doctor_id_idx on public.appointments(doctor_id);
create index payments_appointment_id_idx on public.payments(appointment_id);
create index notifications_user_id_idx on public.notifications(user_id); 
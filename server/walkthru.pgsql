--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.5
-- Dumped by pg_dump version 9.6.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: a1
--

CREATE TABLE knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE knex_migrations OWNER TO a1;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: a1
--

CREATE SEQUENCE knex_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE knex_migrations_id_seq OWNER TO a1;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: a1
--

ALTER SEQUENCE knex_migrations_id_seq OWNED BY knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: a1
--

CREATE TABLE knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE knex_migrations_lock OWNER TO a1;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: a1
--

CREATE SEQUENCE knex_migrations_lock_index_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE knex_migrations_lock_index_seq OWNER TO a1;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: a1
--

ALTER SEQUENCE knex_migrations_lock_index_seq OWNED BY knex_migrations_lock.index;


--
-- Name: user_information; Type: TABLE; Schema: public; Owner: a1
--

CREATE TABLE user_information (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    admin text NOT NULL,
    CONSTRAINT user_information_admin_check CHECK ((admin = ANY (ARRAY['web'::text, 'not-web'::text])))
);


ALTER TABLE user_information OWNER TO a1;

--
-- Name: user_information_id_seq; Type: SEQUENCE; Schema: public; Owner: a1
--

CREATE SEQUENCE user_information_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE user_information_id_seq OWNER TO a1;

--
-- Name: user_information_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: a1
--

ALTER SEQUENCE user_information_id_seq OWNED BY user_information.id;


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: a1
--

ALTER TABLE ONLY knex_migrations ALTER COLUMN id SET DEFAULT nextval('knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: a1
--

ALTER TABLE ONLY knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('knex_migrations_lock_index_seq'::regclass);


--
-- Name: user_information id; Type: DEFAULT; Schema: public; Owner: a1
--

ALTER TABLE ONLY user_information ALTER COLUMN id SET DEFAULT nextval('user_information_id_seq'::regclass);


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: a1
--

COPY knex_migrations (id, name, batch, migration_time) FROM stdin;
6	20180902134406_createUserTable.js	1	2018-09-02 16:10:14.194-05
\.


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: a1
--

SELECT pg_catalog.setval('knex_migrations_id_seq', 6, true);


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: a1
--

COPY knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: a1
--

SELECT pg_catalog.setval('knex_migrations_lock_index_seq', 1, true);


--
-- Data for Name: user_information; Type: TABLE DATA; Schema: public; Owner: a1
--

COPY user_information (id, email, password_hash, admin) FROM stdin;
1	not-web@gmail.com	$2b$12$Sx/3N/7/Mtuq1DFnz1RbpuXRhPtfnnk8exH6FQsSRTYZ1Z7TDXu3u	not-web
2	web@gmail.com	$2b$12$MSGYnOAm0Wgk5VPZvUA9neOYfUQlKRL0Kuq7Cey8.R/cnFlbXtriW	web
\.


--
-- Name: user_information_id_seq; Type: SEQUENCE SET; Schema: public; Owner: a1
--

SELECT pg_catalog.setval('user_information_id_seq', 3, true);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: a1
--

ALTER TABLE ONLY knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: a1
--

ALTER TABLE ONLY knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: user_information user_information_pkey; Type: CONSTRAINT; Schema: public; Owner: a1
--

ALTER TABLE ONLY user_information
    ADD CONSTRAINT user_information_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--


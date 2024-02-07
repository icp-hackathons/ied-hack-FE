dfx deploy backend --network ic --argument '(record { 
    network = variant { regtest };
    schools = vec {
        record {
            description = "Welcome to Horizon University, where knowledge meets opportunity amidst the scenic shores of Seaview City, nestled in the heart of Pacifica. Established in 1975, Horizon University has been a beacon of academic excellence, nurturing minds and shaping futures for nearly five decades. At Horizon, we believe in fostering an environment where students are not just learners but visionaries, equipped to navigate the complexities of the modern world. Our picturesque campus, adorned with state-of-the-art facilities, provides the perfect backdrop for intellectual exploration and personal growth.";
            id = 1 : nat;
            images = vec {
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            };
            location = "Serenity Valley, Cascade Hills";
            name = "Harmony College";
            students = vec { 1; 2; 3; 4; 5 };
        };
        record {
            description = "Perched atop the picturesque Mountain Peaks in Crestview City, Summit University stands as a beacon of academic achievement and aspiration. Since its founding in 1965, Summit University has been dedicated to pushing the boundaries of knowledge and empowering students to reach new heights of intellectual and personal growth. Our rigorous curriculum, led by a team of distinguished faculty members, ensures that students are equipped with the skills and knowledge needed to excel in their chosen fields. With a focus on innovation and entrepreneurship, Summit University fosters a culture of creativity and critical thinking, preparing graduates to become leaders in their industries.";
            id = 2 : nat;
            images = vec {
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            };
            location = "Crestview City, Mountain Peaks";
            name = "Summit University";
            students = vec { 6; 7; 8; 9; 10 };
        };
        record {
            description = "Located amidst the lush greenery of Gardenia Valley in Blossomville, Eden College is a haven for students seeking to explore the wonders of academia and nature. Established in 1982, Eden College is committed to providing a nurturing and supportive environment where students can flourish both intellectually and personally. Our interdisciplinary approach to education encourages students to make connections across various fields of study, fostering a deeper understanding of the world around them. With a focus on sustainability and environmental stewardship, Eden College prepares students to become responsible global citizens who are equipped to tackle the pressing challenges of our time.";
            id = 3 : nat;
            images = vec {
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            };
            location = "Blossomville, Gardenia Valley";
            name = "Eden College";
            students = vec { 11; 12; 13; 14; 15 };
        }; 
        record {
            description = "Rising from the ashes of Ember City in Blaze County, Phoenix Institute is a symbol of resilience and transformation. Founded in 2005, Phoenix Institute is dedicated to empowering students to overcome adversity and emerge stronger and more determined than ever before. Our dynamic and innovative curriculum, guided by passionate faculty members, encourages students to embrace change and pursue their dreams with unwavering determination. With a focus on experiential learning and real-world application, Phoenix Institute prepares students to adapt and thrive in an ever-changing global landscape.";
            id = 4 : nat;
            images = vec {
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            };
            location = "Ember City, Blaze County";
            name = "Phoenix Institute";
            students = vec { 16; 17; 18; 19; 20 };
        };

    };
    students = vec {
        record {
            bio = "Emily is a passionate environmentalist who loves spending time outdoors and advocating for sustainability initiatives. She is actively involved in community service projects and hopes to make a positive impact on the world.";
            gpa = "4.2";
            id = 1 : nat;
            image = "https://images.unsplash.com/photo-1671726203454-5d7a5370a9f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Junior";
            name = "Emily Chen";
            schoolId = 1 : nat;
        };
        record {
            bio = "Jamal is a budding entrepreneur with a keen interest in technology and innovation. He is the founder of a successful startup and is always looking for new opportunities to learn and grow.";
            gpa = "3.9";
            id = 2 : nat;
            image = "https://images.unsplash.com/photo-1545696968-1a5245650b36?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Senior";
            name = "Jamal Patel";
            schoolId = 1 : nat;
        };
        record {
            bio = "Mia is a talented artist who finds inspiration in nature and the beauty of the world around her. She is known for her creativity and passion for storytelling through her artwork.";
            gpa = "3.6";
            id = 3: nat;
            image = "https://images.unsplash.com/photo-1517256673644-36ad11246d21?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Sophomore";
            name = "Mia Rodriguez";
            schoolId = 1 : nat;
        };
        record {
            bio = "Daniel is a dedicated student-athlete who excels both on the field and in the classroom. He is captain of the soccer team and is known for his leadership skills and determination.";
            gpa = "4.0";
            id = 4 : nat;
            image = "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Junior";
            name = "Danel Lee";
            schoolId = 1 : nat;
        };
        record {
            bio = "Sophia is a driven computer science major with a passion for coding and software development. She is involved in various coding competitions and hackathons and aspires to pursue a career in technology.";
            gpa = "4.5";
            id = 5 : nat;
            image = "https://images.unsplash.com/photo-1529470839332-78ad660a6a82?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Freshman";
            name = "Sophia Nguyen";
            schoolId = 1 : nat;
        };
        record {
            bio = "Alex is a curious explorer who is fascinated by the mysteries of the universe. He spends his free time stargazing and dreaming of space exploration.";
            gpa = "4.3";
            id = 6 : nat;
            image = "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Senior";
            name = "Alex Johnson";
            schoolId = 2 : nat;
        };
        record {
            bio = "Rachel is a driven economics major with a passion for finance and investment. She is involved in the university`s finance club and aspires to work on Wall Street one day.";
            gpa = "3.8";
            id = 7 : nat;
            image = "https://images.unsplash.com/photo-1611432579699-484f7990b127?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Junior";
            name = "Rachel Evans";
            schoolId = 2 : nat;
        };
        record {
            bio = "Liam is a talented musician who finds solace in the melodies of his guitar. He is passionate about music education and hopes to inspire others through his love for music.";
            gpa = "3.7";
            id = 8 : nat;
            image = "https://images.unsplash.com/photo-1492462543947-040389c4a66c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Sophomore";
            name = "Liam Thompson";
            schoolId = 2 : nat;
        };
         record {
            bio = "Grace is a dedicated pre-med student with a passion for helping others. She volunteers at the local hospital and dreams of becoming a doctor one day.";
            gpa = "4.1";
            id = 9 : nat;
            image = "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Junior";
            name = "Grace Kim";
            schoolId = 2 : nat;
        };
        record {
            bio = "Lucas is a natural leader with a passion for social justice and activism. He is involved in various student organizations and is committed to making a difference in his community.";
            gpa = "3.9";
            id = 10 : nat;
            image = "https://images.unsplash.com/photo-1589391818925-19a3cd54fa28?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Freshman";
            name = "Lukas Martinez";
            schoolId = 2 : nat;
        };
        record {
            bio = "Ava is an aspiring botanist who finds joy in studying plant life and ecosystems. She spends her weekends volunteering at local gardens and botanical centers.";
            gpa = "4.4";
            id = 11 : nat;
            image = "https://images.unsplash.com/photo-1610012525054-b6ab57df6105?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Senior";
            name = "Ava Thompson";
            schoolId = 3 : nat;
        };
         record {
            bio = "Ethan is a passionate advocate for wildlife conservation and sustainability. He is involved in research projects focused on preserving endangered species and habitats.";
            gpa = "3.7";
            id = 12 : nat;
            image = "https://images.unsplash.com/photo-1646470350098-7966d0486d7d?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Junior";
            name = "Ethan Ramirez";
            schoolId = 3 : nat;
        };
        record {
            bio = "Lily is a talented dancer with a passion for choreography and performance art. She dreams of opening her own dance studio one day and inspiring others through movement.";
            gpa = "3.9";
            id = 13 : nat;
            image = "https://images.unsplash.com/photo-1521252659862-eec69941b071?q=80&w=1872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Sophomore";
            name = "Lily Chen";
            schoolId = 3 : nat;
        };
        record {
            bio = "Jackson is a dedicated environmental science major with a love for the great outdoors. He enjoys hiking, camping, and exploring nature in his free time.";
            gpa = "4.2";
            id = 14 : nat;
            image = "https://images.unsplash.com/photo-1542178243-bc20204b769f?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Junior";
            name = "Jackson Lee";
            schoolId = 3 : nat;
        };
         record {
            bio = "Sofia is a driven psychology major with a passion for understanding the human mind. She aspires to become a clinical psychologist and help individuals overcome mental health challenges.";
            gpa = "4.0";
            id = 15 : nat;
            image = "https://images.unsplash.com/photo-1637589381587-f8f416046fb4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Freshman";
            name = "Sofia Patel";
            schoolId = 3 : nat;
        };
        record {
            bio = "Aidan is a natural problem-solver with a passion for engineering and technology. He enjoys building robots and participating in robotics competitions.";
            gpa = "4.3";
            id = 16 : nat;            
            image = "https://images.unsplash.com/photo-1529245219944-bad177f5f3be?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Senior";
            name = "Aidan Thompson";
            schoolId = 4 : nat;
        };
        record {
            bio = "Maya is a creative storyteller with a passion for filmmaking and visual arts. She dreams of producing her own films and telling stories that inspire change.";
            gpa = "3.8";
            id = 17 : nat;
            image = "https://images.unsplash.com/photo-1608453162650-cba45689c284?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Junior";
            name = "Maya Singh";
            schoolId = 4 : nat;
        };
        record {
            bio = "Caleb is a dedicated student-athlete with a love for sports and physical fitness. He excels both on the field and in the classroom, balancing his studies with rigorous training sessions.";
            gpa = "3.9";
            id = 18 : nat;
            image = "https://images.unsplash.com/photo-1526328398151-ad1065c82a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Sophomore";
            name = "Caleb Johnson";
            schoolId = 4 : nat;
        };
        record {
            bio = "Ava is a compassionate humanitarian with a passion for social work and community development. She volunteers at local shelters and is dedicated to making a difference in the lives of others.";
            gpa = "4.1";
            id = 19 : nat; 
            image = "https://images.unsplash.com/photo-1541216970279-affbfdd55aa8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Junior";
            name = "Ava Garcia";
            schoolId = 4 : nat;
        };
        record {
            bio = "Noah is a curious explorer with a love for adventure and discovery. He enjoys traveling to new places and immersing himself in different cultures.";
            gpa = "4.0";
            id = 20 : nat;
            image = "https://images.unsplash.com/photo-1604177091072-b7b677a077f6?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            level = "Freshman";
            name = "Noah Patel";
            schoolId = 4 : nat;
        };
    }
})' 
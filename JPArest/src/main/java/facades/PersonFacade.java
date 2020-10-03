package facades;

import DTO.PersonDTO;
import DTO.PersonsDTO;
import entities.Address;
import entities.Person;
import exceptions.MissingInputException;
import exceptions.PersonNotFoundException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import utils.EMF_Creator;

public class PersonFacade implements IPersonFacade {

    private static PersonFacade instance;
    private static EntityManagerFactory emf;

    //Private Constructor to ensure Singleton
    private PersonFacade() {
    }

    /**
     *
     * @param _emf
     * @return an instance of this facade class.
     */
    public static PersonFacade getPersonFacade(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new PersonFacade();
        }
        return instance;
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public long getPersonCount() {
        EntityManager em = getEntityManager();
        try {
            long personCount = (long) em.createQuery("SELECT COUNT(p) FROM Person p").getSingleResult();
            return personCount;
        } finally {
            em.close();
        }

    }

    @Override
    public PersonDTO addPerson(String fName, String lName, String phone, String street, int zip, String city) throws MissingInputException {
        if ((fName.length() == 0) || (lName.length() == 0)) {
            throw new MissingInputException("First Name and/or Last Name is missing");
        }
        EntityManager em = getEntityManager();
        Person person = new Person(fName, lName, phone);
        try {
            em.getTransaction().begin();
            Query query = em.createQuery("SELECT a FROM Address a WHERE a.street = :street AND a.zip = :zip AND a.city = :city");
            query.setParameter("street", street);
            query.setParameter("zip", zip);
            query.setParameter("city", city);
            List<Address> addresses = query.getResultList();
            if (addresses.size() > 0) {
                person.setAddress(addresses.get(0)); // The address already exists
            } else {
                person.setAddress(new Address(street, zip, city));
            }
            person.setCreated();
            em.persist(person);
            
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return new PersonDTO(person);
    }

    @Override
    public PersonDTO deletePerson(int id) throws PersonNotFoundException {
        EntityManager em = getEntityManager();
        Person p = em.find(Person.class, id);
        try {
            em.getTransaction().begin();
            em.remove(p);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return new PersonDTO(p);
    }

    @Override
    public PersonDTO getPerson(int id) throws PersonNotFoundException {
        EntityManager em = getEntityManager();
        Person p = em.find(Person.class, id);
        return new PersonDTO(p);
    }

    @Override
    public PersonsDTO getAllPersons() {
        EntityManager em = getEntityManager();
        try {
            return new PersonsDTO(em.createNamedQuery("Person.getAllRows").getResultList());
        } finally {
            em.close();
        }
    }

    @Override
    public PersonDTO editPerson(PersonDTO p) throws PersonNotFoundException, MissingInputException {
        if ((p.getfName().length() == 0) || (p.getlName().length() == 0)) {
            throw new MissingInputException("First Name and/or Last Name is missing");
        }
        EntityManager em = getEntityManager();
        try {
            em.getTransaction().begin();
            Person pers = em.find(Person.class, p.getId());
            if (pers == null) {
                throw new PersonNotFoundException(String.format("Person with id: (%d) not found", p.getId()));
            } else {
                pers.setFirstName(p.getfName());
                pers.setLastName(p.getlName());
                pers.setPhone(p.getPhone());
                pers.getAddress().setStreet(p.getStreet());
                pers.getAddress().setZip(p.getZip());
                pers.getAddress().setCity(p.getCity());
            }
            pers.setLastEdited();
            em.getTransaction().commit();
            return new PersonDTO(pers);
        } finally {
            em.close();
        }
    }

    public static void main(String[] args) {
        //Create emf pointing to the dev-database
        EntityManagerFactory emf = EMF_Creator.createEntityManagerFactory();
        
        Person p1 = new Person("Claes", "Lindholm", "123456");
        p1.setAddress(new Address("Kildeskovsvej 53", 2820, "Gentofte"));
        Person p2 = new Person("Hans", "Jensen", "789123");
        p2.setAddress(new Address("Lyngfeldtsvej 11", 3300, "Frederiksværk"));
        Person p3 = new Person("Kurt", "Vonnegut", "654321");
        p3.setAddress(new Address("Harsdorffsvej 12", 1834, "Frederiksberg"));

        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            //em.createQuery("DELETE from Person").executeUpdate();
            em.persist(p1);
            em.persist(p2);
            em.persist(p3);

            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }
}

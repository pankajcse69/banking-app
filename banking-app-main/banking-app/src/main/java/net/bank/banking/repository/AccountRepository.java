package net.bank.banking.repository;

import net.bank.banking.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account  ,Long>{
}
